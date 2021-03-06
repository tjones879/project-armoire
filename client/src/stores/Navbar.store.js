import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            links: [{
                title:"Login",
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/login`
            },
            {
                title:"Register",
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/register`
            }],
            logoutBtn: {
                style: {
                    'display':'none'
                }
            }
        }
    }
    start(payload){
        if(typeof payload !== "undefined"){
            this.store.logoutBtn.style = {"display":"inline-block"};
            this.store.links.pop({title:'Register'});
            this.store.links.pop({title:'Login'});
            this.store.links.push({
                title:'Account',
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/account`
            });
            this.store.links.push({
                title:'Courses',
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/courses`
            });
            if(payload.classification === "professor"){
                this.store.links.push({
                    title:'Students',
                    link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/student`
                });
            }
        }
    }
    getAll(){
        return this.store;
    }
    actionHandler(action){
        switch(action.type){
            case "NAVBAR_START":{
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