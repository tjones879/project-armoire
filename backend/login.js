var Mongoose = require('mongoose');
var Authentication = require('./db/authentication.js');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
let _ = require('lodash');

module.exports = function login(email, password){
    return new Promise((resolve, reject) => {
        /* check if email exists */
        Authentication.findOne({email}).then(obj => {
            if(!_.isEmpty(obj)){
                bcrypt.compare(password, obj.hash, function(err, response) {
                    if(err){
                        console.log(err);
                        reject(err);
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
                                reject(err);
                                return;
                            }
                            resolve(token);
                        });
                    }else
                        reject(new Error("wrong password"));
                });
            }else
                reject(new Error("email not found"));
        }).catch(err => {
            console.log(err.message);
            reject(err);
        });
    });
}