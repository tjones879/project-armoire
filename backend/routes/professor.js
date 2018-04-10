/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();
let Professor = require('../db/professor.js');
var Mongoose = require('mongoose');

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

/* GET login_id/id professor listing. */
router.get('/login_id/:id', (req, res) => {
    console.log(req.params.id);
    let id = new Mongoose.Types.ObjectId(req.params.id);
    Professor.find({login_id:id}).then((obj) => {
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
                console.log('found professor');
                res.json(obj);
            } else {
                console.log('professor not found');
                res.json({status: 'failure'});
            }
        });
    }
});

module.exports = router;

