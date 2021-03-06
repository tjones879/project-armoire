import {EventEmitter} from 'events';
import React from 'react';
import AuthService from '../AuthService';

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
            feedback:"",
            tests: []
        };

        this.Auth = new AuthService();
    }
    getAll(){
        return this.store;
    }
    start(payload){
        this.store.id = payload.id;
        this.store.user = payload.user;
        try{
            fetch(`../assignment/${this.store.id}`).then(response => response.json()).then(payload => {
                payload.open_date = new Date(payload.open_date);
                payload.open_date = payload.open_date.toDateString();
                payload.close_date = new Date(payload.close_date);
                payload.close_date = payload.close_date.toDateString();
                this.store.assignment = payload;
                this.store.tests = payload.tests.map((test, index) => 
                    (test.visible) ? 
                    <div className="row" key={index}>
                        <div className="col">
                            <strong>{test.label}</strong>
                            <div className="outlined-sunk-wht">
                                <pre style={{textAlign: 'left', margin: 5}}>{test.action}</pre>
                            </div>
                        </div>
                    </div>
                    : null
                ).filter((test) => {if (test !== null) return test});
                this.store.examples = payload.examples.map((example, index) =>
                    <div className="row" key={index}>
                        <div className="col text-center outlined-sunk-wht">
                            {example.input}
                        </div>
                        <div className="col text-center outlined-sunk-wht">
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
