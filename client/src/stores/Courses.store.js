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
    start(payload){
        let path = this.store;
        const user = path.user = payload;
        fetch(`/student/courses/${user.id}`).then(response => response.json()).then(payload => {
            path.courses = payload;
            this.emit("change");
        }).catch(err =>
            console.log(err.message)
        );
    }
    actionHandler(action){
        switch(action.type){
            case "COURSES_START":{
                this.start(action.payload);
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