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
    }

    inputChange(which, value){
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case "INPUT_CHANGE":{
                this.inputChange(action.payload.which, action.payload.value);
                break;
            }
            default:{
                break;
            }
        }
    }
}

const createCourseStore = new CreateCourseStore();
dispatcher.register(createCourseStore.handleActions.bind(createCourseStore));
export default createCourseStore;