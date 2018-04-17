import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            id: null,
            user: {},
            assignments: []
        }
    }
    getAll(){
        return this.store;
    }
    init(payload){
        this.store.id = payload.id;
        this.store.user = payload.user;
        try{
            fetch(`../course/${this.store.id}`).then(x => x.json()).then(payload => {
                let assignmentIds = payload.assignments;
                let proms = [];
                let betterAssignments = [];
                for(let i = 0; i < assignmentIds.length; i++){
                    proms.push(
                      fetch(`../assignment/${assignmentIds[i]}`).then(x => x.json()).then(payload => {
                        betterAssignments.push(payload);
                      }).catch(err => {
                        console.log(err.message);
                      })
                    );
                }
                Promise.all(proms).then(()=>{
                    this.store.assignments = betterAssignments;
                    console.log(betterAssignments);
                    this.emit("change");
                }).catch(err => {console.log(err.message)});
            }).catch(err => {
                console.log(err.message);
            });
        }catch(err){    
            console.log(err.message);
        }
        this.emit("change");
    }
    actionHandler(action){
        switch(action.type){
            case "EXACT_COURSE_START":{
                this.init(action.payload);
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