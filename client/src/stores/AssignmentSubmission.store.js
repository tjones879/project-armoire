import {EventEmitter} from 'events';
import React from 'react';

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
            submissionBox:null
        }
    }
    getAll(){
        return this.store;
    }
    start(payload){
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
            default:{
                break;
            }
        }
    }
    submit(){
        fetch('../submission', {
            method:"POST",
            body:{
                course: this.store.assignment.course,
                assignment: this.store.id,
                source:this.store.submissionBox
            }
        }).then(response => response.json()).then(payload => {

        }).catch(err => {

        });
        //This is where submissions should be sent to the backend and a response
        //should be retreived from the backend
        //submission (post)
        //returns object with submission id and results of tests
        console.log(this.store.submissionBox);
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