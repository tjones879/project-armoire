/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var Student = require('../db/student.js');
var Course = require('../db/course.js');
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

router.get('/courses/:id', (req, res) => {
    const id = Mongoose.Types.ObjectId(req.params.id);
    try{
        Student.findOne({login_id:id}).then(payload => {
            const courses = payload.courses;
            let betterCourses = [];
            let proms = [];
            for(let i = 0; i < courses.length; i++){
                proms.push(
                    Course.findById(courses[i].id).then(payload => {
                        betterCourses.push(payload);
                    }).catch(err => {
                        console.log(err.message);
                    })
                )
            }
            Promise.all(proms).then(payload => {
                res.send(betterCourses);
            }).catch(err => {
                console.log(err.message);
            });
        }).catch(err => {
            console.log(err.message);
        });
    }catch(err){
        console.log(err.message);
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

router.post('/add/course', (req, res) => {
    let sid = req.body.sid, cid = Mongoose.Types.ObjectId(req.body.cid);
    try{
        Student.findById(sid).then(payload => {
            let courses = payload.courses;
            courses.push({id:cid, assignments:[]});
            try{
                Student.findByIdAndUpdate(sid, {$set:{courses:courses}}).then(payload => {
                    res.json(payload);
                }).catch(err => {
                    console.log(err.message);
                    res.json({});
                });
            }catch(err){
                console.log(err.message);
                res.json({});
            }        
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
    }catch(err){
        console.log(err.message);
        res.json({});
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


