import {EventEmitter} from 'events';
import React from 'react';
import AuthService from '../components/AuthService';

import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            id:null,
            user:{},
            assignment:{},
            init:false,
            examples:null,
            submissionBox:null,
            stdinBox:null,
            feedback:""
        };

        this.Auth = new AuthService();
    }
    getAll(){
        return this.store;
    }
    start(payload){
        console.log(payload);
        this.store.id = payload.id;
        this.store.user = payload.user;
        try{
            fetch(`../assignment/${this.store.id}`).then(response => response.json()).then(payload => {
                this.store.assignment = payload;
                this.store.examples = payload.examples.map((example, index) =>
                    <div className="row" key={index}>
                        <div className="col text-center">
                            {example.input}
                        </div>
                        <div className="col text-center">
                            {example.output}
                        </div>
                    </div>
                );
                this.emit("change");
            }).catch(err => {
                console.log(err.message);
            });
        }catch(err){
            console.log(err.message);
        }
        console.log(this.store);
        this.store.init = true;
        this.emit("change");
    }
    change(payload){
        switch(payload.id){
            case "contents":{
                this.store.submissionBox = payload.value;
                break;
            }
            case "stdin": {
                this.store.stdinBox = payload.value;
                break;
            }
            default:{
                break;
            }
        }
    }
    submit(){
        try{
            fetch('../submission', {
                method:"POST",
                body:JSON.stringify({
                    course: this.store.assignment.course,
                    assignment: this.store.id,
                    source:this.store.submissionBox,
                    input: this.store.stdinBox
                }),
                headers:{
                    "content-type":"application/json",
                    'Authorization': `Bearer ${this.Auth.getToken()}`
                }
            }).then(response => response.json()).then(payload => {
                if(typeof payload._id !== "undefined" && typeof payload.test_results !== "undefined"){
                    this.store.feedback = "submission completed";
                    this.emit("change");
                }else{
                    this.store.feedback = "error"
                    this.emit("change");
                }
            }).catch(err => {
                this.store.feedback = "error";
                this.emit("change");
                console.log(err.message);
            });
            this.store.feedback = "submission sent";
            this.emit("change");
        }catch(err){
            this.store.feedback = "error";
            this.emit("change");
            console.log(err.message);
        }
    }
    actionHandler(action){
        switch(action.type){
            case "ASSIGNMENT_SUBMISSION_START":{
                this.start(action.payload);
                break;
            }
            case "ASSIGNMENT_SUBMISSION_CHANGE":{
                this.change(action.payload);
                break;
            }
            case "ASSIGNMENT_SUBMISSION_SUBMIT":{
                this.submit();
                break;
            }
            default:{
                break;
            }
        }
    }
}

const store = new Store();
dispatcher.register(store.actionHandler.bind(store));
export default store;
