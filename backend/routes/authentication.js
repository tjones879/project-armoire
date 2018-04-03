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

/* used to login to the system and recieve a JWT */
router.post('/login', function(req, res, next){
    if(req.body.email != "" && req.body.password != ""){

        let emailV = req.body.email.toLowerCase();
        let passwordV = req.body.password;
        let salt = "";
        
        /* check if email exists */
        Authentication.findOne({email: emailV}, (err, obj) => {
            if(obj != null){

                /* get salt from database */
                salt = obj.salt;
                /* combine salt with password */
                passwordV = `${salt}${passwordV}`;
                /* hash the combined passwords */
                const hash = crypt.createHash('sha256');
                passwordV = hash.update(passwordV).digest('hex');

                /* check if email and given hash match our records in the db */
                Authentication.findOne({email: emailV, hash: passwordV}, (err, obj) => {
                    if(err){
                        console.log(`DB Failure: on email + password lookup for ${emailV}`);
                        res.json({success:false});
                        return;
                    }

                    if(obj != null){
                        /* both password hash and email match */
                        console.log(`Login Success: from ${emailV}`);

                        const user = {
                            id:obj._id,
                            email:obj.email,
                            classification:obj.classification
                        };
                        jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err,token) => {
                            if(err){
                                console.log(`Token Failure: failure on sign by ${emailV}`);
                                res.json({success: false});
                                return;
                            }
                            console.log(`Token Success: success by ${emailV}`);
                            res.json({
                                success: true,
                                token
                            });
                        });
                    }else{
                        /* password hash did not match password */
                        console.log(`Login Failed: wrong password by ${emailV}`);
                        res.json({
                            success: false
                        });
                    }
                });
            }else{
                /* email was not found in mongo db */
                console.log(`Login Failed: ${emailV} was not found in the mongo db`);
                res.json({
                    success: false
                });
            }
        });
    }else{
        res.json({
            success:false,
            error: 1,
            text:"Fields are empty"
        });
    }
});

router.post('/registration', function(req, res, next){
    if(typeof req.body.first !== "undefined" && typeof req.body.last !== "undefined"
    && typeof req.body.email !== "undefined" && typeof req.body.password !== "undefined"
    && typeof req.body.confirm !== "undefined" && req.body.password === req.body.confirm 
    && typeof req.body.classification !== "undefined"){
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
                    salt: salt,
                    classification: req.body.classification,
                    verified: false
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
                            /* Students */
                            person.save()
                            .then(result =>{
                                console.log(`student added to database: ${req.body}`);
                                res.status(200).json({success:true,email:req.body.email,classification:req.body.classification});
                            }).catch(err => {
                                res.status(200).json({success:false, errType: "general"});
                                console.log(err);
                            });
                        }else{
                            /* Professors */
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
                /* Someone with the same email has already registered */
                res.status(200).json({success:false,errType:"duplicate",email:req.body.email})
            }
        });
    }else{
        /* form is not fully filled out */
        res.status(200).json({success:false, errType: "not filled out"});
    }
});

module.exports = router;

