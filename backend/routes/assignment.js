var express = require('express');
var router = express.Router();
let Mongoose = require('mongoose');
let Assignment = require('../db/assignment.js');

/*
 * GET assignment listing.
 */
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
