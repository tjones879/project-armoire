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
        this.submitCourse = this.submitCourse.bind(this);

        this.Auth = new AuthService();
    }

    change(payload){
        const value = payload.value;
        let path = this.data.input;
        switch(payload.id){
            case 'cName':{
                path.cName = value;
                break;
            }
            case 'cNum':{
                path.cNum = value;
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
            fetch('/course',{
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
                if(obj.status === 'error'){
                    this.data.feedback = obj.payload;
                    this.emit('change');
                }else if(obj.status === 'success'){
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
            case "CREATE_COURSE_CHANGE":{
                this.change(action.payload);
                break;
            }
            case 'CREATE_COURSE_SUBMIT':{
                this.submitCourse();
                break;
            }
            default:{
                break;
            }
        }
    }
}

export const createCourseStore = new CreateCourseStore();
dispatcher.register(createCourseStore.handleActions.bind(createCourseStore));
