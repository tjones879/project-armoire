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
const jwt = require('jsonwebtoken');




/* GET professors listing. */
router.get('/', function(req, res, next) {
    res.json({
        id: "ObjectId",
        email: "example@cmu.edu",
        hash: "HASH EXAMPLE"
    });
});

router.post('/login', function(req, res, next){
    if(req.body.email != "" && req.body.password != ""){
        let emailV = req.body.email.toLowerCase();
        let passwordV = req.body.password;
        let salt = "";
        Authentication.findOne({email: emailV}, (err, obj) => {
            if(obj != null){
                salt = obj.salt;
                passwordV = `${salt}${passwordV}`;
                const hash = crypt.createHash('sha256');
                passwordV = hash.update(passwordV).digest('hex');
                Authentication.findOne({email: emailV, hash: passwordV}, (err, obj) => {
                    if(obj != null){
                        const user = {
                            id:obj._id,
                            email:obj.email,
                        };
                        jwt.sign({user}, 'grapeJuic3', {expiresIn: '15m'}, (err,token) => {
                            res.json({
                                success: true,
                                token
                            });
                            console.log(token);
                        });
                        console.log("logged in");
                    }else{
                        console.log("not logged in");
                    }
                });
            }else{
                //not found
            }
        });
    }else{
        res.json({success:false, text:"Fields are empty"});
    }
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

