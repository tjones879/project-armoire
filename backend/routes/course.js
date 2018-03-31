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

router.post('/', (req, res, next) => {
    if(req.body.cName === '' && req.body.cNum === ''){
        res.json({
            status:'error',
            payload:'Must insert a course name and a course number.'
        });
    }else{
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
    }
});

module.exports = router;

