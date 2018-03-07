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

module.exports = router;


