import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';

class CreateAssignmentStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: "",
            user: {},
            courses: [],
            options: [],
            examples: [1],
            tests: [1],
            data: {
                course: "",
                aTitle: "",
                aOpen: "",
                aClose: "",
                aDescript: "",
                aReq: "",
                examples: [
                ],
                tests: [
                ]
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
    }

    getInfo(user){
        fetch(`course/login_id/${user.id}`).then(payload => payload.json()).then(res => {
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
                }else if(/^A/.test(id)){
                    let pos = id.slice(1,id.length);
                    if(pos > this.store.data.tests.length){
                        let offset = pos - this.store.data.tests.length;
                        for(let i = 0; i < offset; i++){
                            if(i === offset - 1){
                                this.store.data.tests.push({
                                    id: pos,
                                    action:value,
                                    expected:""
                                });
                            }else{
                                this.store.data.tests.push({
                                    id: pos,
                                    action:"",
                                    expected:""
                                });
                            }
                        }
                        
                    }else{
                        this.store.data.tests[pos - 1].action = value;
                    }
                }else if(/^E/.test(id)){
                    let pos = id.slice(1,id.length);
                    if(pos > this.store.data.tests.length){
                        let offset = pos - this.store.data.tests.length;
                        for(let i = 0; i < offset; i++){
                            if(i === offset - 1){
                                this.store.data.tests.push({
                                    id:pos,
                                    action:"",
                                    expected:value
                                });
                            }else{
                                this.store.data.tests.push({
                                    id:pos,
                                    action:"",
                                    expected:""
                                });
                            }
                        }
                        
                    }else{
                        this.store.data.tests[pos - 1].expected = value;
                    }
                }
                break;
            }
        }
    }

    submit(){
        fetch('assignment', {
            method: 'POST',
            body:JSON.stringify({
                course:this.store.data.course,
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
            fetch(`course/add/assignment/${obj._id}/${obj.course}`, {
                method: 'POST'
            }).then(payload => payload.json()).then(obj => {
                if(obj != null){
                    this.store.feedback = `Successfully created the course '${this.store.data.aTitle}' under the course '${obj.title}'`;
                    this.emit("change");
                }else{
                    this.store.feedback = 'Error';
                    this.emit("change");
                }
            }).catch();
        }).catch();
    }

    getAll(){
        return this.store;
    }
    actionHandler(action){
        switch(action.type){
            case "GET_INFO":{
                this.getInfo(action.payload.user);
                break;
            }
            case "ADD_EXAMPLE":{
                this.addExample();
                break;
            }
            case "ADD_TEST":{
                this.addTest();
                break;
            }
            case "CHANGE":{
                this.change(action.payload.id, action.payload.value);
                break;
            }
            case "SUBMIT_ASSIGNMENT":{
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