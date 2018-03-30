import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class CreateCourseStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            input:{
                cName: "",
                cNum: ""
            }
        }
        this.handleActions = this.handleActions.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(which, value){
        switch(which){
            case 'cName':{
                this.data.input.cName = value;
                console.log(this.data.input.cName);
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

    handleActions(action){
        console.log("here");
        switch(action.type){
            case "INPUT_CHANGE":{
                this.inputChange(action.payload.which, action.payload.value);
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