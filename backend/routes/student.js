/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
var Student = require('../db/student.js');
var Mongoose = require('mongoose');

/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        login_id: "ObjectId",
        fname: "Tyler",
        lname: "Jones",
        courses: [{ id: "ObjectId",
                    grade: 80,
                    assignments: [{
                            id: "ObjectId",
                            submissions: [{
                                    id: "ObjectId",
                                    contents: "String",
                                    tests: [{
                                            id: 000,
                                            output: "Output"
                                    }]
                            }]
                    
                    }]
                }]
    });
});

router.post('/', (req, res, next) => {
        if(req.body.email !== 'undefined' && req.body.id !== 'undefined'){
                Student.findOne({login_id: new Mongoose.Types.ObjectId(req.body.id)}, (err, obj) => {
                        if(obj != null){
                                console.log('found student');
                                res.json(obj);
                        }else{
                                console.log('student not found');
                                res.json({status:'failure'});
                        }
                });
        }
});

module.exports = router;


