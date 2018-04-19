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

    /* This function handles what happens to the store when the user
       pushes the search button. */
    submit(){
        fetch(`../student/${this.store.data.fname}/${this.store.data.lname}`).then(res => res.json()).then(payload => {
            let path = this.store; //save on typing
            const len = path.sLen = payload.length;
            path.feedback = `Found ${len} Result`;
            if(len >= 1){ //only assign if data is actually there
                path.feedback += 's'; //add 's' if more than one
                path.students = payload; //put students into the store
            }
            this.emit("change");
        }).catch(err => {
            this.store.feedback = "An error has occured";
            console.log(err.message);
            this.emit("change");
        });
    }
    start(user){
        this.store.user = user;
        fetch(`../course/login_id/${user.id}`).then(response => response.json()).then(payload => {
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
    addStudentToCourse(payload){
        let id = payload.id;
        console.log(id);
        let index = this.store.selectBoxForms.findIndex( form => form.id === `courseSelect${id}`);
        if(index === -1){
            console.log("not found");
        }else{
            fetch('../student/add/course', {
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
            case "SEARCH_STUDENT_CHANGE":{
                this.change(action.payload.id, action.payload.value);
                break;
            }
            case "SEARCH_STUDENT_SUBMIT":{
                this.submit();
                break;
            }
            case "SEARCH_STUDENT_START":{
                this.start(action.payload);
                break;
            }
            case "SEARCH_STUDENT_ADD_STUDENT":{
                this.addStudentToCourse(action.payload);
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
