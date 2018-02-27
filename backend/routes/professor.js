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
        fname: "John",
        lname: "Smith",
        courses: ["CS 101", "Software Engineering", "User Interface Design"]
    });
});

module.exports = router;

