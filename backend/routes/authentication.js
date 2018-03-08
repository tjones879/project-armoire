/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Authentication = require('../db/authentication.js');
var crypt = require("crypto");
const hash = crypt.createHash('sha256');

/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        email: "example@cmu.edu",
        hash: "HASH EXAMPLE"
    });
});

router.post('/registration', function(req, res, next){
    if(typeof req.body.first != "undefined" && req.body.first != "undefined"
    && req.body.email != "undefined" && req.body.password != "undefined"
    && req.body.confirm != "undefined" && req.body.password == req.body.confirm){
        var salt = crypt.randomBytes(12).toString('hex');
        var saltedPass = `${salt}${req.body.password}`;
        var hashedPass = hash.update(saltedPass).digest('hex');
        console.log(hashedPass);
        const login = new Authentication({
            _id: Mongoose.Types.ObjectId(),
            email: req.body.email,
            hash: hashedPass,
            salt: salt
        });
        login.save()
            .then(result => 
                res.status(200).redirect('http://localhost:3000/login')
            ).catch(err =>
                //Update this to be more informative in future
                res.status(500).json({success:false})
            );
    } 
});

module.exports = router;

