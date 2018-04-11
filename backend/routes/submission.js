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
    }
];

/*
 * Obtain a random string of size bytes as a unique identifier
 * for the submission.
 */
function random(size) {
    return require('crypto').randomBytes(size).toString('hex');
}

function langToIndex(language) {
    if (language === 'c++')
        return 1;
    else if (language === 'python3')
        return 0;
    else if (language === 'python2')
        return 2;
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
    console.log(req.body);
    let code = req.body.source;
    let assignID = req.body.assignment;
    // TODO: Get the current student id by jsonwebtoken
    let findSubmission = (studentID, courseID, assignID) => {
        Student.findOne(
            {'_id': studentID},
            'courses',
            (err, student) => {
                if (err)
                    return undefined;

                for (let course in student.courses) {
                    if (course.id === courseID) {
                        for (let assign in course.assignments) {
                            if (assign.id === assignID) {
                                let max = 0;
                                for (let sub in assign.submissions) {
                                    if (max === 0 || sub.id.Time() > max.id.Time())
                                        max = sub;
                                }
                                return max;
                            }
                        }
                    }
                }
                return undefined;
            })
        // Find the correct course
    }

    let buildPayload = (student, assign) => {
        let payload = {
            timeout_value:   10000, // ms
            path:            __dirname + '/',
            folder:          'temp/' + random(10),
            vm_name:         'virtual_machine',
            code:            code,
            language:        compilers[langToIndex(assign.language)],
            stdin_data:      "Hello",
            student:         student,
            course:          assign.course,
            assignment:      assign._id
        };


        var dockerCompiler = new Compiler(payload);

        dockerCompiler.run((data, exec_time, err) => {
            let sub = findSubmission(student, assign.course, assign._id);
            console.log("ADSFASDF:", sub);
            res.json({
                output: data,
                code: code,
                errors: err,
                time: exec_time
            });
        });
    }

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
