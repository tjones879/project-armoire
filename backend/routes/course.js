/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
let Mongoose = require('mongoose');
const Course = require('../db/course');
const Professor = require('../db/professor');
const jwt = require('jsonwebtoken');

/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        name: "CS 101",
        crn: "CSCI490",
        assignments: ["Project 1", "Project 2", "Project 3"]
    });
});

router.get('/:id', (req,res) => {
    try{
        Course.findById(req.params.id).then(payload => {
            res.json(payload);
        }).catch(err => {
            console.log(err.message);
            res.send(null);
        });
    }catch(err){
        console.log(err.message);
        res.send(null);
    }
});

function getCourses(courses){
    return new Promise((resolve, reject) => {
        let betterCourses = [];
        let prom = [];
        let count = 0;
        for(let i = 0; i < courses.length; i++){
            prom.push(Course.findById(courses[i]).then(res => {
                betterCourses.push(res);
            }).catch())
        }
        Promise.all(prom).then(response => {
            resolve(betterCourses);
        });
    });
}

router.get('/:id', (req, res, next) => {
    Professor.findOne({login_id:req.params.id}).then(obj => {
        if(obj != null){
            const courses = obj.courses;
            getCourses(courses).then(response => {
                res.send(response);
            }).catch();
        }else{
            res.send([]);
        }
    }).catch(err => {
        res.send([]);
    });
});

router.post('/add/assignment/:assignments/:course', (req, res, next) => {
    Course.findById(req.params.course).then(response => {
        response.assignments.push(req.params.assignments);
        Course.findByIdAndUpdate(response._id,{ $set: {assignments: response.assignments}}).then(response => {
            res.json(response);
        }).catch(err => {
            res.json({});
        });
    }).catch();
});

router.post('/', (req, res, next) => {
    if(req.body.cName === '' && req.body.cNum === ''){
        res.json({
            status:'error',
            payload:'Must insert a course name and a course number.'
        });
    }else{
        Course.findOne({crn:req.body.cNum}).then((cObj) => {
            if(cObj == null){
                console.log("CRN available");
                const course = new Course({
                    _id: Mongoose.Types.ObjectId(),
                    title: req.body.cName,
                    crn: req.body.cNum,
                    assignments: []
                });
                course.save().then(obj => {
                    if(obj != null){
                        let decoded = jwt.verify(req.token, process.env.JWT_SECRET);
                        const user = decoded.user;
                        Professor.findOne({login_id:user.id}).then(obj2 => {
                            let newC = obj2.courses;
                            newC.push(obj._id);
                            Professor.update({login_id:user.id}, {$set:{courses:newC}}, (err) => {
                                if(err){
                                    console.log(err);
                                    return;
                                }
                                res.json({
                                    status:'success',
                                    payload:`Successfully added course '${obj.title}' with the course number '${obj.crn}'`
                                });
                            });
                        })
                    }
                }).catch(error => {
                    res.json({
                        status:'error',
                        payload:'An error has occured on the server'
                    })
                    console.log(error);
                });
            }else{
                console.log("CRN taken");
                res.json({
                    status:'error',
                    payload:`The course number '${req.body.cNum}' is already taken`
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
});

module.exports = router;

