import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import * as Actions from '../actions/actions';
import store from './Navbar.store';

class LoginStore extends EventEmitter{
    constructor(){
        super();
        this.data = {
            feedback: "",
            email: "",
            password: "",
            emailLock: false,
            passwordLock: false,
            buttonLock: false,
            logoutStyle: {
                "display":"none"
            }
        }

        this.login = this.login.bind(this);
        this.lockdown = this.lockdown.bind(this);
        this.logout = this.logout.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }

    lockdown(){
        this.data.emailLock = true;
        this.data.passwordLock = true;
        this.data.buttonLock = true;
    }

    updateFeedback(mem, value){
        switch(mem){
            case "feedback":{
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

    logout(){
        this.data.feedback = "";
        this.data.emailLock = false;
        this.data.passwordLock = false;
        this.data.buttonLock = false;
        this.data.logoutStyle = {"display":"none"};
        this.emit("change");
    }

    loggedIn(){
        this.lockdown();
        this.data.logoutStyle = {"display":"inline-block"};
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
        }).then(payload => 
            payload.json()
        ).then(obj => {
            if(obj.success){
                localStorage.setItem('token', obj.token);
                this.data.feedback = "Successful Login! You will be redirected in 5 seconds...";
                this.loggedIn();
                Actions.changeNavbar({classification:"student"});
                store.emit("change");
                setTimeout(()=>{window.location = 'account'}, 5000);
            }else{
                if(obj.error === 1){
                    this.data.feedback = "Fields are empty!";
                }else{
                    this.data.feedback = "Username or password is incorrect";
                }
            }

            this.emit("change");
        }).catch(err => {
            this.data.feedback = "An error has occurred";
            console.log(err.message);
            this.emit("change");
        });
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
            case "LOCKDOWN":{
                this.lockdown();
                break;
            }
            case "LOGOUT":{
                this.logout();
                break;
            }
            case "LOGGEDIN":{
                this.loggedIn();
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
