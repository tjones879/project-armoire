var Mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
var Assignment = require('../db/assignment.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
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

router.post('/', function(req, res, next) {
    var assignment = new Assignment({
        _id: Mongoose.Types.ObjectId(),
        course: req.body.form.course,
        openDate: req.body.form.openDate,
        closeDate: req.body.form.closeDate,
        description: req.body.form.description,
        requirements: req.body.form.requirements,
        examples: req.body.form.examples
    })
    assignment.save().then((result)=>{
        console.log(JSON.stringify(result));
    }).catch((err)=>{
        console.log(err);
    })
    const text = req.body.form;

    res.type('json');
    res.json({
        data: text
    });
});

module.exports = router;
