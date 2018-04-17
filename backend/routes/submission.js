let express = require('express');
let router = express.Router();
let Mongoose = require('mongoose');
let Assignment = require('../db/assignment.js');
let Student = require('../db/student.js');
let Compiler = require('../dockerCompiler.js');
const jwt = require('jsonwebtoken');

let compilers = [
    {
        compile_cmd: '',
        src_file: 'file.py',
        run_cmd: 'python3 file.py',
        name: 'Python 3',
    },
    {
        src_file: 'file.cpp',
        compile_cmd: 'g++ file.cpp -o /codeDir/a.out ',
        run_cmd: './a.out',
        name: 'C++',
    },
    {
        compile_cmd: '',
        src_file: 'file.py',
        run_cmd: 'python file.py',
        name: 'Python 2',
    },
    {
        src_file: 'Main.java',
        compile_cmd: 'javac Main.java',
        run_cmd: 'java Main',
        name: 'Java',
    }
];

/*
 * Obtain a random string of size bytes as a unique identifier
 * for the submission.
 */
function random(size) {
    return require('crypto').randomBytes(size).toString('hex');
}

/*
 * Obtain the correct compiler struct depending on the string sent
 * by the client.
 */
function langToIndex(language) {
    language = language.toLowerCase();
    if (language === 'python3')
        return 0;
    else if (language === 'c++')
        return 1;
    else if (language === 'python2')
        return 2;
    else if (language === 'java')
        return 3;
}

/*
 * GET submission listing.
 */
router.get('/', (req, res) => {
    Assignment.find({}, (err, a) => {
        if (err)
            res.send(err);
        res.json(a);
    });
});

/*
 * GET assignment by id.
 */
router.get('/:id', (req, res) => {
    let id = Mongoose.Types.ObjectId(req.params.id);
    Assignment.findOne({_id: id}, (err, a) => {
        if (err)
            res.send(err);
        res.json(a);
    });
});

/*
 * Allow a student to post their work as an assignment.
 *
 * The body of the request must contain the assignment that they are
 * submitting for.
 *
 * The user must also be already authenticated in order for the submission
 * to be valid.
 */
router.post('/', (req, res) => {
    let code = req.body.source;
    let assignID = req.body.assignment;
    let input = req.body.input;
    let findSubmission = (studentID, courseID, assignID, callback) => {
        // Return a student from the database so that only the correct
        // course and assignment are returned.
        Student.findOne(
            {'_id': studentID},
            {'courses': {
                '$elemMatch': {
                    'id': Mongoose.Types.ObjectId(courseID),
                    'assignments': {
                        '$elemMatch': {
                            'id': Mongoose.Types.ObjectId(assignID)
                        }
                    },
                }
            }},
            (err, student) => {
                if (err)
                    return undefined;

                let course = student.courses[0];
                let assignments = course.assignments[0];
                let subs = assignments.submissions.toObject();

                let max = 0;
                for (let i = 0; i < subs.length; i++) {
                    if (max === 0 || subs[i]._id.getTimestamp() > max._id.getTimestamp()) {
                        max = subs[i];
                    }
                }
                callback(max);
            }
        );
    };

    let buildPayload = (student, assign) => {
        let payload = {
            timeout_value:   10000, // ms
            path:            __dirname + '/',
            folder:          'temp/' + random(10),
            vm_name:         'virtual_machine',
            code:            code,
            language:        compilers[langToIndex(assign.language)],
            stdin_data:      input,
            student:         student,
            course:          assign.course,
            assignment:      assign._id
        };


        var dockerCompiler = new Compiler(payload);

        dockerCompiler.run((err, data) => {
            if (err)
                res.send(data);
            findSubmission(student, assign.course, assign._id, (sub) => {
                res.json({
                    _id: sub._id,
                    output: sub.output,
                    test_results: sub.test_results,
                    time: sub.time
                });
            });
        });
    };

    // Verify student info
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        Student.findOne({login_id: Mongoose.Types.ObjectId(decoded.user.id)}, (error, student) => {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Get the assignment info from the db.
            Assignment.findOne({_id: Mongoose.Types.ObjectId(assignID)}, (error, assign) => {
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                buildPayload(student._id, assign);
            });
        });
    });
});

module.exports = router;
