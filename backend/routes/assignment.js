var express = require('express');
var router = express.Router();
let Mongoose = require('mongoose');
let Assignment = require('../db/assignment.js');

/*
 * GET assignment listing.
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

router.post('/', (req, res) => {
    let body = req.body;
    let id = Mongoose.Types.ObjectId();
    console.log(body);
    let newAssignment = new Assignment({
        _id:          id,
        course:       body.course,
        language:     body.language,
        title:        body.title,
        open_date:    body.open_date,
        close_date:   body.close_date,
        description:  body.description,
        requirements: body.requirements,
        examples:     body.examples,
        tests:        body.tests
    });
    newAssignment.save((err, a) => {
        if (err) {
            res.send(err);
        } else {
            res.json(a);
        }
    });
});

module.exports = router;
