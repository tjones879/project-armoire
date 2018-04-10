import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';

class SearchStudentsStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: null,
            user: {},
            sLen: 0,
            students:[],
            courses:[],
            options:[],
            selectBoxForms:[],
            data:{
                fname: null,
                lname: null
            },
            elements:{
                input:[
                    {
                        type:"text",
                        text:"First Name",
                        id:"fname",
                        name:"fname"
                    },
                    {
                        type:"text",
                        text:"Last Name",
                        id:"lname",
                        name:"lname"
                    }
                ]
            }
        };
        
        this.getAll = this.getAll.bind(this);
    }
    getAll(){
        return this.store;
    }
    submit(){
        fetch(`student/${this.store.data.fname}/${this.store.data.lname}`).then(response => response.json()).then(payload => {
            let len = payload.length,s;
            (len > 1 || len === 0)?s = 's':s = '';
            this.store.feedback = `Found ${len} Result${s}`;
            this.store.sLen = len;
            this.store.students = payload;
            this.emit("change");
        }).catch(err => {

        });
    }
    user(user){
        this.store.user = user.user;
        fetch(`course/login_id/${user.user.id}`).then(response => response.json()).then(payload => {
            let options = [];
            for(let i = 0; i < payload.length; i++){
                options.push({
                    text: payload[i].title,
                    value: payload[i]._id
                });
            }
            this.store.courses = payload;
            this.store.options = options;
            this.emit("change");
        }).catch(err => {
            console.log(err.message);
        });
    }
    addStudentToCourse(id){
        let index = this.store.selectBoxForms.findIndex( form => form.id === `courseSelect${id}`);
        if(index === -1){
            console.log("not found");
        }else{
            fetch('student/add/course', {
                method:'POST',
                body: JSON.stringify({
                    cid: this.store.selectBoxForms[index].value,
                    sid: id
                }),
                headers:{
                    'content-type':'application/json'
                }
            }).then(response => response.json()).then(payload => {
                this.store.feedback = `Added course '${this.store.selectBoxForms[index].value}' to student '${id}`;
                this.emit("change");
            }).catch(err => {
                console.log(err.message);
            });
        }
    }

    change(id, value){
        let data = this.store.data;
        switch(id){
            case "fname":{
                data.fname = value;
                break;
            }
            case "lname":{
                data.lname = value;
                break;
            }
            default:{
                let index = this.store.selectBoxForms.findIndex(form => form.id === id)
                if( index === -1){
                    this.store.selectBoxForms.push({
                        id:id,
                        value: value
                    });
                }else{
                    this.store.selectBoxForms[index] = {
                        id:id,
                        value: value
                    };
                }
                console.log(id, value);
                break;
            }
        }
    }
    actionHandler(action){
        switch(action.type){
            case "CHANGE_STUDENT_SEARCH":{
                this.change(action.payload.id, action.payload.value);
                break;
            }
            case "SUBMIT_SEARCH_STUDENT":{
                this.submit();
                break;
            }
            case "USER_SEARCH_STUDENT":{
                this.user(action.payload.user);
                break;
            }
            case "ADD_STUDENT_TO_COURSE":{
                this.addStudentToCourse(action.payload.id);
                break;
            }
            default:{
                break;
            }
        }
    }
}

const store = new SearchStudentsStore();
dispatcher.register(store.actionHandler.bind(store));
export default store;
