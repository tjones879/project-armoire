import {EventEmitter} from 'events';

import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            id:null,
            user:{},
            assignment:{}
        }
    }
    getAll(){
        return this.store;
    }
    start(payload){
        this.store.id = payload.id;
        this.store.user = payload.user;
        try{
            fetch(`../assignment/${this.store.id}`).then(response => response.json()).then(payload => {
                this.store.assignment = payload;
                this.emit("change");
            }).catch(err => {
                console.log(err.message);
            });
        }catch(err){
            console.log(err.message);
        }
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