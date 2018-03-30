import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import AuthService from '../components/AuthService';

class CreateCourseStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            feedback: '',
            input:{
                cName: "",
                cNum: ""
            },
            form:{
                elements:[
                    {
                        type:'text',
                        id:'cName',
                        name:'courseName',
                        text:'Course Name'
                    },
                    {
                        type:'text',
                        id:'cNum',
                        name:'courseNumber',
                        text:'Course Number'
                    }
                ]
            }
        }
        this.handleActions = this.handleActions.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.submitCourse = this.submitCourse.bind(this);

        this.Auth = new AuthService();
    }

    inputChange(which, value){
        switch(which){
            case 'cName':{
                this.data.input.cName = value;
                break;
            }
            case 'cNum':{
                this.data.input.cNum = value;
                break;
            }
            default:{
                break;
            }
        }
        this.emit("change");
    }

    submitCourse(){
        if(this.Auth.loggedIn()){
            fetch('http://localhost:3000/course',{
                method: 'POST',
                body:JSON.stringify({
                    cName: this.data.input.cName,
                    cNum: this.data.input.cNum
                }),
                headers:{
                    'content-type':'application/json',
                    'Authorization': `Bearer ${this.Auth.getToken()}`
                }
            }).then(payload => payload.json()).then(obj => {
                console.log(obj);
                if(obj.status === 'error'){
                    this.data.feedback = obj.payload;
                    this.emit('change');
                }
            }).catch();
        }else{
            this.data.feedback = 'Not logged in, must be logged in to create course';
            this.emit('change');
        }
    }

    getAll(){
        return this.data;
    }

    handleActions(action){
        switch(action.type){
            case "CHANGE_INPUT":{
                this.inputChange(action.payload.which, action.payload.value);
                break;
            }
            case 'SUBMIT_COURSE':{
                this.submitCourse();
                break;
            }
            default:{
                console.log("Nothing for the createCourseStore to handle");
                break;
            }
        }
    }
}

export const createCourseStore = new CreateCourseStore();
dispatcher.register(createCourseStore.handleActions.bind(createCourseStore));