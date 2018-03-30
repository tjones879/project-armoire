/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();

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
    }
});

module.exports = router;

