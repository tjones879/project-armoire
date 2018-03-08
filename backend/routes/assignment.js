var express = require('express');
var router = express.Router();
let Assignment = require('../db/assignment.js');

/* GET assignment listing. */
router.get('/', (req, res) => {
    res.json({
        name: "Project 1",
        openDate: new Date(2018,1,1),
        closeDate: new Date(2018,2,1),
        description: "DESCRIPTION TEXT",
        requirements: "REQUIREMENT RANDOM TEXT",
        io: [
            {input: "EXAMPLE INPUT 1", output: "EXAMPLE OUTPUT 1" },
            {input: "EXAMPLE INPUT 2", output: "EXAMPLE OUTPUT 2" }
        ],
        tests: [
            {success: false, label: "EXAMPLE LABEL 1"},
            {success: true,  label: "EXAMPLE LABEL 2"}
        ]
    });
});

router.post('/', (req, res) => {
    let newAssignment = new Assignment(req.body);
    newAssignment.save((err, a) => {
        if (err) {
            res.send(err);
        } else {
            res.json(a);
        }
    });
});

module.exports = router;
