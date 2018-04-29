/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
let Professor = require('../db/professor.js');
var Authentication = require('../db/authentication.js');
var Mongoose = require('mongoose');
let login = require('../login.js');

/* GET  ALL professors listing. */
router.get('/', (req, res) => {
    Professor.find().then((arr) => {
        if(arr != null){
            res.send(arr);
        }
        else{
            res.send([]);
        }
    }).catch((err) => {console.log(err.message);res.send([]);})
});

router.post('/update', (req, res) => {
    if(typeof req.body.id !== "undefined" && typeof req.body.lname !== "undefined" && typeof req.body.fname !== "undefined" && typeof req.body.email !== "undefined" && typeof req.body.login_id !== "undefined" && typeof req.body.password !== "undefined"){
        let rObj = {
            fname:null,
            lname:null,
            email:null,
            token:null
        };
        Professor.findByIdAndUpdate(req.body.id, {$set:{lname:req.body.lname,fname:req.body.fname}}, {new:true}).then(obj => {
            if(obj != null){
                rObj.fname = obj.fname;
                rObj.lname = obj.lname;
                Authentication.findByIdAndUpdate(req.body.login_id, {$set:{email:req.body.email}}, {new:true}).then(obj => {
                    rObj.email = obj.email;
                    let emailV = req.body.email.toLowerCase();
                    let passwordV = req.body.password;
                    let salt = "";
                    
                    login(emailV, passwordV).then(token => {
                        console.log(token);
                        res.json(token);
                    }).catch(err => {console.log(err.message);res.json({})});
                }).catch(err => {
                    console.log(err.message);
                    res.json({});
                });
            }
        }).catch(err => {
            console.log(err.message);
            res.json({});
        });
    }
});

/* GET login_id/id professor listing. */
router.get('/login_id/:id', (req, res) => {
    console.log(req.params.id);
    let id = new Mongoose.Types.ObjectId(req.params.id);
    Professor.findOne({login_id:id}).then((obj) => {
        if(obj != null){
            res.json(obj);
        }
        else{
            res.json({});
        }
    }).catch((err) => {console.log(err.message);res.json({});})
})

/* GET /id professor listing. */
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    Professor.findById(req.params.id).then((obj) => {
        if(obj != null){
            res.json(obj);
        }
        else{
            res.json([]);
        }
    }).catch((err) => {
        console.log(err.message);
        res.json({});
    })
})

/* POST a new professo listing. */
router.post('/', (req, res, next) => {
    if (req.body.id !== undefined && req.body.email !== undefined){
        Professor.find({login_id: new Mongoose.Types.ObjectId(req.body.id)}, (err, obj) => {
            if (obj !== null) {
                res.json(obj);
            } else {
                res.json({status: 'failure'});
            }
        });
    }
});

module.exports = router;

