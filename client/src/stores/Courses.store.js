import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            coursesList: [],
            coursesInfo: []
        }
    }
    getAll(){
        return this.store;
    }
    start(payload){
        let path = this.store;
        payload.map((courseId) => {
            fetch(`/course/${courseId}`).then(resp => resp.json()).then(obj => {
                path.coursesInfo.push(obj);
                this.emit('change');
            });
            this.emit('change');
        });
        this.emit('change');
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