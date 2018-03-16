import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            feedback: "",
            email: "",
            password: ""
        }
    }
    updateFeedback(mem, value){
        switch(mem){
            case "user":{
                this.data.feedback = value;
                break;
            }
            default:{
                break;
            }
        }
        this.emit("change");
    }
    updateValue(mem, value){
        switch(mem){
            case "email":{
                this.data.email = value;
                break;
            }
            case "password":{
                this.data.password = value;
                break;
            }
            default:{
                break;
            }
        }
        this.emit("change");
    }
    login(){
        fetch('http://localhost:3000/authentication/login',{
            method: 'POST',
            body:JSON.stringify({
                email: this.data.email,
                password: this.data.password
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then(function(a){
            return a.json();
        }).then(function(json){
            if(json.success){
                localStorage.setItem('token', json.token);
                document.cookie = `email=${json.email}`;
                document.cookie = `id=${json.id}`;
            }else{
            }
        }).catch(err => {
            //error
        });
        this.emit("change");
    }
    handleActions(action){
        switch(action.type){
            case "UPDATE_FEEDBACK":{
                this.updateFeedback(action.member, action.text);
                break;
            }
            case "UPDATE_VALUE":{
                this.updateValue(action.member, action.text);
                break;
            }
            case "LOGIN":{
                this.login();
                break;
            }
            default:{
                break;
            }
        }
    }
    getAll(){
        return this.data;
    }
}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore;