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
var Authentication = require('../db/authentication.js');
var crypt = require("crypto");
const jwt = require('jsonwebtoken');
let login = require('../login.js');

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

/* This function takes in a name of any capitalization,
   and returns a name with the first letter capitalized
   and the rest of the name in lowercase. This is how
   the names are stored in the database */
function formatName(name){
    let fixed = name.toLowerCase(); //convert all to lowercase
    return fixed.charAt(0).toUpperCase() + fixed.slice(1); //capitalize the first letter and add the second half back
}

/* This route is used to search for students by their first
   and last name. For return values, it returns an array of
   every student with the matching name, or it returns an
   empty array if no student is found with the parameters */
router.get('/:first/:last', (req, res) => {
    try{
        const fname = formatName(req.params.first); //format first name
        const lname = formatName(req.params.last); //format last name

        Student.find({fname, lname}).then(arr =>
            res.json(arr) //returns array of object with length of 1+
        ).catch(err => {
            console.log(err.message);
            res.json([]); //returns empty array
        });
    }catch(err){
        console.log(err.message);
        res.json([]); //return empty array is error occurs
    }
});

router.post('/update', (req, res) => {
    console.log(req.body);
    if(typeof req.body.id !== "undefined" && typeof req.body.lname !== "undefined" && typeof req.body.fname !== "undefined" && typeof req.body.email !== "undefined" && typeof req.body.login_id !== "undefined" && typeof req.body.password !== "undefined"){
        let rObj = {
            fname:null,
            lname:null,
            email:null,
            token:null
        };
        Student.findByIdAndUpdate(req.body.id, {$set:{lname:req.body.lname,fname:req.body.fname}}, {new:true}).then(obj => {
            if(obj != null){
                rObj.fname = obj.fname;
                rObj.lname = obj.lname;
                Authentication.findByIdAndUpdate(req.body.login_id, {$set:{email:req.body.email}}, {new:true}).then(obj => {
                    rObj.email = obj.email;
                    let emailV = req.body.email.toLowerCase();
                    let passwordV = req.body.password;
                    let salt = "";
                    
                    login(emailV, passwordV).then(token => {
                        res.json(token);
                    }).catch(err => {res.json({})});
                }).catch(err => {
                    console.log(err.message);
                    res.json({});
                });
            }
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
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


