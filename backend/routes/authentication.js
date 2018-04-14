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
let _ = require('lodash');




/* GET professors listing. */
router.get('/:id', function(req, res, next) {
    Authentication.findById(req.params.id).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err.message);
        res.json({});
    });
});

/* used to login to the system and recieve a JWT */
router.post('/login', (req, res) => {
    if(typeof req.body.email !== "undefined" && typeof req.body.password !== "undefined"){

        const email = req.body.email.toLowerCase();
        let password = req.body.password;
        let salt = "";
        
        /* check if email exists */
        Authentication.findOne({email}).then(obj => {
            if(!_.isEmpty(obj)){
                salt = obj.salt; //get salt from database
                password = `${salt}${password}`; //combine salt with password
                const hash = crypt.createHash('sha256'); //hash the combined passwords
                password = hash.update(password).digest('hex');

                /* check if email and given hash match our records in the db */
                Authentication.findOne({email, hash: password}).then(obj => {
                    if(!_.isEmpty(obj)){
                        const user = {
                            id:obj._id,
                            email:obj.email,
                            classification:obj.classification
                        };
                        jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
                            if(err){
                                console.log(err.message);
                                res.json({});
                                return;
                            }
                            res.json(token);
                        });
                    }else
                        res.json({}); //password hash did not match password
                }).catch(err => {
                    console.log(err.message);
                    res.json({});
                });
            }else
                res.json({}); //email not found in database
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
    }else
        res.json({});
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

