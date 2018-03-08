/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Authentication = require('../db/authentication.js');

/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        email: "example@cmu.edu",
        hash: "HASH EXAMPLE"
    });
});

router.post('/registration', function(req, res, next){
    console.log(req.body);
    const login = new Authentication({
        _id: Mongoose.Types.ObjectId(),
        email: req.body.email,
        hash: req.body.password,
        salt: "jkfkls4dlc"
    });
    login.save()
        .then(result => 
            res.status(200).json({success:true})
        ).catch(err =>
            res.json({success:false})
        );
});

module.exports = router;

