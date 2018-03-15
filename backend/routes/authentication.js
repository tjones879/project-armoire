/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Authentication = require('../db/authentication.js');
var Student = require('../db/student.js');
var Professor = require('../db/professor.js');
var crypt = require("crypto");


/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        email: "example@cmu.edu",
        hash: "HASH EXAMPLE"
    });
});

router.post('/registration', function(req, res, next){
    if(typeof req.body.first != "undefined" && req.body.last != "undefined"
    && req.body.email != "undefined" && req.body.password != "undefined"
    && req.body.confirm != "undefined" && req.body.password == req.body.confirm){
        /* Check if email is already in the database first */
        Authentication.find({email: req.body.email}, (err,docs) => {
            if(err){
                console.log(err);
                return;
            }
            if(!docs.length){
                /* this has mush be initialized every call to post */
                const hash = crypt.createHash('sha256');
                let salt = crypt.randomBytes(12).toString('hex');
                let saltedPass = `${salt}${req.body.password}`;
                let hashedPass = hash.update(saltedPass).digest('hex');
                let loginID = Mongoose.Types.ObjectId();
                const login = new Authentication({
                    _id: loginID,
                    email: req.body.email,
                    hash: hashedPass,
                    salt: salt
                });
                const person = new Student({
                    _id: Mongoose.Types.ObjectId(),
                    login_id: loginID,
                    fname: req.body.first,
                    lname: req.body.last,
                    courses: []
                });
                const profess = new Professor({
                    _id: Mongoose.Types.ObjectId(),
                    login_id: loginID,
                    fname: req.body.first,
                    lname: req.body.last,
                    courses: []
                });
                login.save()
                    .then(result =>{
                        if(req.body.classification === "student"){
                            person.save()
                            .then(result =>{
                                res.status(200).json({success:true,email:req.body.email,classification:req.body.classification});
                            }).catch(err => {
                                res.status(200).json({success:false, errType: "general"});
                                console.log(err);
                            });
                        }else{
                            profess.save()
                            .then(result => {
                                res.status(200).json({success:true,email:req.body.email, classification:req.body.classification});
                            }).catch(err =>{
                                res.status(200).json({success:false, errType: "general"});
                                console.log(err);
                            });
                        }
                    }).catch(err => {
                        res.status(200).json({success:false, errType: "general"});
                        console.log(err);
                    });
            }else{
                res.status(200).json({success:false,errType:"duplicate",email:req.body.email})
            }
        });
    }else{
        res.status(200).json({success:false, errType: "not filled out"});
    }
});

module.exports = router;

