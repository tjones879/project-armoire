import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';

class SearchStudentsStore extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: null,
            sLen: 0,
            students:[],
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
            default:{
                break;
            }
        }
    }
}

const store = new SearchStudentsStore();
dispatcher.register(store.actionHandler.bind(store));
export default store;
