let express = require('express');
let router = express.Router();
let Mongoose = require('mongoose');
let Assignment = require('../db/assignment.js');
let Compiler = require('../dockerCompiler.js');

let arr = [
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
    let language = req.body.language;
    let code = req.body.code;

    // Get the current student id by jsonwebtoken
    let student = 

    let course = req.body.course;
    let assignment = req.body.assignment;

    let payload = {
        timeout_value:   10000, // ms
        path:            __dirname + '/',
        folder:          'temp/' + random(10),
        vm_name:         'virtual_machine',
        code:            code,
        language:        arr.compilers[language],
        stdin_data:      req.body.stdin,
    };

    var dockerCompiler = new Compiler(payload);

    dockerCompiler.run((data, exec_time, err) => {
        res.send({
            output: data,
            langid: language,
            code: code,
            errors: err,
            time: exec_time
        });
    });
});

module.exports = router;
