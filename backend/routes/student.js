/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var Student = require('../db/student.js');
var Mongoose = require('mongoose');

/* GET student listing. */
router.get('/', function(req, res, next) {
    Student.find().then(obj => {
        res.json(obj);
    }).catch(err => {
        console.log(err.message);
        res.json({});
    });
});

// Get student by ObjectId
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Student.findById(id).then(obj => {
        res.json(obj);
    }).catch(err => {
        console.log(err.message);
        res.json({});
    });
});

// Get student by login ObjectId
router.get('/login_id/:id', (req, res) => {
    try{
        let id = Mongoose.Types.ObjectId(req.params.id);
        Student.findOne({login_id:id}).then(obj => {
            res.json(obj);
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
    }catch(err){
        console.log(err.message);
        res.json({});
    }
});

//Get student by First and Last name
router.get('/:first/:last', (req, res) => {
    try{
        let fname = req.params.first;
        let lname = req.params.last;
        Student.find({fname, lname}).then(obj => {
            res.json(obj);
        }).catch(err => {
            console.log(err.message);
            res.json([]);
        });
    }catch(err){
        console.log(err.message);
        res.json([]);
    }
});

router.post('/', (req, res, next) => {
    if(req.body.email !== undefined && req.body.id !== undefined) {
        Student.findOne({login_id: new Mongoose.Types.ObjectId(req.body.id)}, (err, obj) => {
            if (obj !== null) {
                console.log('found student');
                res.json(obj);
            } else {
                console.log('student not found');
                res.json({status: 'failure'});
            }
        });
    }
});

module.exports = router;


