var Mongoose = require('mongoose');

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
