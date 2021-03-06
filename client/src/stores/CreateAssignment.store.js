import {EventEmitter} from 'events';
import React from "react";

import dispatcher from '../dispatcher';

class CreateAssignmentStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: "",
            loading: null,
            user: {},
            courses: [],
            options: [],
            examples: [1],
            tests: [1],
            data: {
                course: "",
                language: "",
                aTitle: "",
                aOpen: "",
                aClose: "",
                aDescript: "",
                aReq: "",
                examples: [],
                tests: []
            },
            form:{
                elements:[
                    {
                        type:"text",
                        id:"aTitle",
                        name:"aTitle",
                        text:"Assignment Title"
                    },
                    {
                        type:"date",
                        id:"aOpen",
                        name:"aOpen",
                        text:"Open Date"
                    },
                    {
                        type:"date",
                        id:"aClose",
                        name:"aClose",
                        text:"Close Date"
                    },
                    {
                        type:"text",
                        id:"aDescript",
                        name:"aDescript",
                        text:"Description"
                    },
                    {
                        type:"text",
                        id:"aReq",
                        name:"aReq",
                        text:"Requirements"
                    }
                ]
            }
        };

        this.getAll = this.getAll.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.addExample = this.addExample.bind(this);
        this.addTest = this.addTest.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.lengthenTests = this.lengthenTests.bind(this);
    }

    start(user){
        console.log(user);
        fetch(`../course/login_id/${user.id}`).then(payload => payload.json()).then(res => {
            this.store.courses = res;
            let delta = [];
            for(let i = 0; i < this.store.courses.length; i++){
                delta.push({
                    text: `${this.store.courses[i].title} - ${this.store.courses[i].crn}`,
                    value: this.store.courses[i]._id
                });
            }
            this.store.options = delta;
            this.emit("change");
        }).catch();
    }
    
    addExample(){
        let l = this.store.examples.length;
        if(l < 5){
            this.store.examples.push(l+1);
            this.emit("change");
        }
    }

    addTest(){
        let l = this.store.tests.length;
        if(l < 10){
            this.store.tests.push(l+1);
            this.emit("change");
        }
    }

    change(id, value){
        switch(id){
            case "CourseSelectBox":{
                this.store.data.course = value;
                break;
            }
            case "LanguageSelectBox":{
                this.store.data.language = value;
                break;
            }
            case "aTitle":{
                this.store.data.aTitle = value;
                break;
            }
            case "aOpen":{
                this.store.data.aOpen = value;
                break;
            }
            case "aClose":{
                this.store.data.aClose = value;
                break;
            }
            case "aDescript":{
                this.store.data.aDescript = value;
                break;
            }
            case "aReq":{
                this.store.data.aReq = value;
                break;
            }
            default:{
                if(/^I/.test(id)){
                    let pos = id.slice(1,id.length);
                    if(pos > this.store.data.examples.length){
                        let offset = pos - this.store.data.examples.length;
                        for(let i = 0; i < offset; i++){
                            if(i === offset - 1){
                                this.store.data.examples.push({
                                    input:value,
                                    output:""
                                });
                            }else{
                                this.store.data.examples.push({
                                    input:"",
                                    output:""
                                });
                            }
                        }
                        
                    }else{
                        this.store.data.examples[pos - 1].input = value;
                    }
                }else if(/^O/.test(id)){
                    let pos = id.slice(1,id.length);
                    if(pos > this.store.data.examples.length){
                        let offset = pos - this.store.data.examples.length;
                        for(let i = 0; i < offset; i++){
                            if(i === offset - 1){
                                this.store.data.examples.push({
                                    input:"",
                                    output:value
                                });
                            }else{
                                this.store.data.examples.push({
                                    input:"",
                                    output:""
                                });
                            }
                        }
                        
                    }else{
                        this.store.data.examples[pos - 1].output = value;
                    }
                } else if (/^A/.test(id)) {
                    let pos = id.slice(1,id.length);
                    this.lengthenTests(pos);
                    this.store.data.tests[pos - 1].action = value;
                } else if (/^L/.test(id)) {
                    let pos = id.slice(1,id.length);
                    this.lengthenTests(pos);
                    this.store.data.tests[pos - 1].label = value;
                } else if (/^Vis/.test(id)) {
                    let pos = id.slice(3,id.length);
                    this.lengthenTests(pos);
                    let curr = this.store.data.tests[pos - 1].visibility;
                    this.store.data.tests[pos - 1].visibility = !curr;
                }
                break;
            }
        }
    }

    /**
     * Lengthen the test array if necessary to accomodate for the given
     * test position. No effect if `pos < tests.length`.
     * @param {integer} pos The position value of the input test
     */
    lengthenTests(pos) {
        for (let i = this.store.data.tests.length; i < pos; i++) {
            this.store.data.tests.push({
                id: pos,
                action: "",
                label: "",
                visible: false
            });
        }
    }

    submit(){
        let path = this.store;
        path.loading = <img src="/images/loading.gif" alt="loading gif" className="loading"/>;
        this.emit("change");
        fetch('../assignment', {
            method: 'POST',
            body:JSON.stringify({
                course:this.store.data.course,
                language:this.store.data.language,
                title:this.store.data.aTitle,
                open_date: this.store.data.aOpen,
                close_date: this.store.data.aClose,
                description: this.store.data.aDescript,
                requirements: this.store.data.aReq,
                examples: this.store.data.examples,
                tests: this.store.data.tests
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then(payload => payload.json()).then(obj => {
            fetch(`../course/add/assignment/${obj._id}/${obj.course}`, {
                method: 'POST'
            }).then(payload => payload.json()).then(obj => {
                path.loading = null;
                if(obj != null){
                    this.store.feedback = `Successfully created the assignment '${this.store.data.aTitle}' under the course '${obj.title}'`;
                    this.emit("change");
                }else{
                    this.store.feedback = 'Error';
                    this.emit("change");
                }
            }).catch(err => {
                path.loading = null;
                this.emit("change");
            });
        }).catch(err => {
            path.loading = null;
            this.emit("change");
        });
    }

    getAll(){
        return this.store;
    }
    actionHandler(action){
        switch(action.type){
            case "CREATE_ASSIGNMENT_START":{
                this.start(action.payload);
                break;
            }
            case "CREATE_ASSIGNMENT_ADD_EXAMPLE":{
                this.addExample();
                break;
            }
            case "CREATE_ASSIGNMENT_ADD_TEST":{
                this.addTest();
                break;
            }
            case "CREATE_ASSIGNMENT_CHANGE":{
                this.change(action.payload.id, action.payload.value);
                break;
            }
            case "CREATE_ASSIGNMENT_SUBMIT":{
                this.submit();
                break;
            }
            default: {
                break;
            }
        }
    }
}

const createAssignmentStore = new CreateAssignmentStore();
dispatcher.register(createAssignmentStore.actionHandler.bind(createAssignmentStore));
export default createAssignmentStore;