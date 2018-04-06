import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            id:null,
            user:{}
        }
    }
    getAll(){
        return this.store;
    }
    start(payload){
        this.store.id = payload.id;
        this.store.user = payload.user;
        console.log(this.store);
        this.emit("change");
    }
    actionHandler(action){
        switch(action.type){
            case "ASSIGNMENT_SUBMISSION_START":{
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