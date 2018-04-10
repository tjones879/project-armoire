import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class RegisterStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            userFeedback: "",
            lock:true,
            firstFeed:"",
            firstValue:"",
            firstStyle:{
                color:"green"
            },
            firstLock: false,
            lastFeed:"",
            lastValue:"",
            lastStyle:{
                color:"green"
            },
            lastLock: false,
            emailValue:"",
            emailFeed:"",
            emailLock: false,
            passFeed:"",
            passValue:"",
            passStyle:{
                color:"green"
            },
            passLock: false,
            confirmFeed:"",
            confirmValue:"",
            confirmStyle:{
                color:"green"
            },
            confirmLock: false,
            classificationValue: "",
            classificationLock: false
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
            case "email":{
                this.data.emailFeed = value.toLowerCase();
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
            case "user":{
                this.data.userFeedback = value;
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
            case "first":{
                this.data.firstValue = value;
                break;
            }
            case "last":{
                this.data.lastValue = value;
                break;
            }
            case "email": {
                this.data.emailValue = value.toLowerCase();
                break;
            }
            case "password": {
                this.data.passValue = value;
                break;
            }
            case "confirm": {
                this.data.confirmValue = value;
                break;
            }
            case "classification": {
                this.data.classificationValue = value;
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

    checkFields(){
        let namReg = new RegExp("^[a-zA-Z'\\- ]{2,35}$");
        let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let passReg = new RegExp("^[a-zA-Z0-9@\\\\#$%&*()_+\\]\\[';:?.,!^-]{8,30}$");
        if(
            namReg.test(this.data.firstValue) &&
            namReg.test(this.data.lastValue) &&
            emailReg.test(this.data.emailValue) &&
            passReg.test(this.data.passValue) &&
            this.data.passValue === this.data.confirmValue &&
            this.data.classificationValue !== ""
        ){
            this.data.lock = false;
        }else{
            this.data.lock = true;
        }
        this.emit("change");
    }

    lockdown(){
        this.data.lock = true;
        this.data.firstLock = true;
        this.data.lastLock = true;
        this.data.emailLock = true;
        this.data.passLock = true;
        this.data.confirmLock = true;
        this.data.classificationLock = true;
        this.emit("change");
    }

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
            case "CHECK_FIELDS":{
                this.checkFields();
                break;
            }
            case "LOCKDOWN":{
                this.lockdown();
                break;
            }
            default: {
            }
        }
    }
};

const registerStore = new RegisterStore();
dispatcher.register(registerStore.handleActions.bind(registerStore));
export default registerStore;