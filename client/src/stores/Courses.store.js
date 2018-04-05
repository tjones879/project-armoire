import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            user:{},
            courses: []
        }
    }
    getAll(){
        return this.store;
    }
    start(user){
        this.store.user = user;
        fetch(`student/courses/${this.store.user.id}`).then(response => response.json()).then(payload => {
            this.store.courses = payload;
            this.emit("change");
        }).catch(err => {
            console.log(err.message);
        });
    }
    actionHandler(action){
        switch(action.type){
            case "COURSES_START":{
                this.start(action.payload.user);
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