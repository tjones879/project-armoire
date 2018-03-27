/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
let Professor = require('../db/professor.js');
var Mongoose = require('mongoose');

/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        fname: "John",
        lname: "Smith",
        courses: ["CS 101", "Software Engineering", "User Interface Design"]
    });
});

router.post('/', (req, res, next) => {
    if(req.body.id !== 'undefined' && req.body.email !== 'undefined'){
        Professor.find({login_id: new Mongoose.Types.ObjectId(req.body.id)}, (err, obj) => {
            if(obj != null){
                console.log('found professor');
                res.json(obj);
            }else{
                console.log('professor not found');
                res.json({status:'failure'});
            }
        });
    }
});

module.exports = router;

