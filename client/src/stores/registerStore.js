import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class RegisterStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            lock:"true",
            firstFeed:"",
            firstStyle:{
                color:"green"
            },
            lastFeed:"",
            lastStyle:{
                color:"green"
            },
            passFeed:"",
            passValue:"",
            passStyle:{
                color:"green"
            },
            confirmFeed:"",
            confirmValue:"",
            confirmStyle:{
                color:"green"
            }
        }
    }
    
    setLock(lockState){
        this.data.lock = lockState;
        this.emit("change");
    }

    getAll(){
        return this.data;
    }
    updateFeedback(mem, value){
        switch(mem){
            case "first":{
                this.data.firstFeed = value;
                break;
            }
            case "last":{
                this.data.lastFeed = value;
                break;
            }
            case "password":{
                this.data.passFeed = value;
                break;
            }
            case "confirm":{
                this.data.confirmFeed = value;
                break;
            }
            default:{

            }
        }
        this.emit("change");
    }
    updateStyle(member, value){
        /* A JSON object must be sent as value */
        switch(member){
            case "first": {
                this.data.firstStyle = value;
                break;
            }
            case "last": {
                this.data.lastStyle = value;
                break;
            }
            case "password": {
                this.data.passStyle = value;
                break;
            }
            case "confirm": {
                this.data.confirmStyle = value;
                break;
            }
            default: {

            }
        }
        this.emit("change");
    };

    updateValue(member, value){
        switch(member){
            case "password": {
                this.data.passValue = value;
                break;
            }
            case "confirm": {
                this.data.confirmValue = value;
                break;
            }
            default: {

            }
        }
        this.emit("change");
    };
    
    checkPasses(){
        let txt = "";
        let col = {};
        let lockV = null;
        if(this.data.passValue === this.data.confirmValue){
            txt = "Passwords Match!";
            col = {color:"green"};
            lockV = false;
        }else{
            txt = "Passwords do not match";
            col = {color:"red"};
            lockV = true;
        }
        this.data.confirmFeed = txt;
        this.data.confirmStyle = col;
        this.data.lock = lockV;
        this.emit("change");
    };

    handleActions(action){
        switch(action.type){
            case "SET_LOCK": {
                this.setLock(action.text);
                break;
            }
            case "UPDATE_FEEDBACK": {
                this.updateFeedback(action.member, action.text);
                break;
            }
            case "UPDATE_STYLE":{
                this.updateStyle(action.member, action.text);
                break;
            }
            case "UPDATE_PASSWORD":{
                this.updatePassword(action.text);
                break;
            }
            case "UPDATE_VALUE":{
                this.updateValue(action.member, action.text);
                break;
            }
            case "CHECK_PASSES":{
                this.checkPasses();
                break;
            }
            default: {
                console.log("Nothing to be handled by RegisterStore");
            }
        }
    }
};

const registerStore = new RegisterStore();
dispatcher.register(registerStore.handleActions.bind(registerStore));
export default registerStore;