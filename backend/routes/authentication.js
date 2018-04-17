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
var bcrypt = require('bcrypt');
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

router.get('/email/:email', (req, res) => {
    Authentication.findOne({email:req.params.email}).then(result => {
        if(result)
            res.json({email:result.email});
        else
            res.json({});
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
        
        /* check if email exists */
        Authentication.findOne({email}).then(obj => {
            if(!_.isEmpty(obj)){
                bcrypt.compare(password, obj.hash, function(err, response) {
                    if(err){
                        console.log(err);
                        res.json({});
                        return;
                    }
                    if(response){
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
                        res.json({});
                });
            }else
                res.json({}); //email not found
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
    }else
        res.json({});
});

function capFirst(input){
    return input.charAt(0).toUpperCase() + input.slice(1);
}

router.post('/registration', (req, res) => {
    if(
        typeof req.body.first !== "undefined" && 
        typeof req.body.last !== "undefined" &&
        typeof req.body.email !== "undefined" && 
        typeof req.body.password !== "undefined" &&
        typeof req.body.confirm !== "undefined" && 
        req.body.password === req.body.confirm && 
        typeof req.body.classification !== "undefined"
    ){
        const fname = capFirst(req.body.first);
        const lname = capFirst(req.body.last);
        /* Check if email is already in the database first */
        Authentication.find({email: req.body.email}, (err,docs) => {
            if(err){
                console.log(err.message);
                res.json({});
            }
            if(!docs.length){
                const saltRounds = 13;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    if(err){
                        console.log(err.message);
                        res.json({});
                        return;
                    }
                        
                    let loginID = Mongoose.Types.ObjectId();

                    const login = new Authentication({
                        _id: loginID,
                        hash: hash,
                        email: req.body.email.toLowerCase(),
                        classification: req.body.classification,
                        verified: false
                    });

                    const person = new Student({
                        _id: Mongoose.Types.ObjectId(),
                        login_id: loginID,
                        fname: fname,
                        lname: lname,
                        courses: []
                    });

                    const profess = new Professor({
                        _id: Mongoose.Types.ObjectId(),
                        login_id: loginID,
                        fname: fname,
                        lname: lname,
                        courses: []
                    });

                    login.save().then(result => {
                        if(req.body.classification === "student"){
                            /* Students */
                            person.save().then(result =>
                                res.status(200).json(result)
                            ).catch(err => {
                                res.json({});
                                console.log(err.message);
                            });
                        }else{
                            /* Professors */
                            profess.save().then(result =>
                                res.status(200).json(result)
                            ).catch(err => {
                                res.json({});
                                console.log(err.message);
                            });
                        }
                    }).catch(err => {
                        res.json({});
                        console.log(err.message);
                    });
                });
            }else
                /* Someone with the same email has already registered */
                res.json({});
        });
    }else
        /* form is not fully filled out */
        res.json({});
});

module.exports = router;

