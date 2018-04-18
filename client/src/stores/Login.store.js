import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import * as actions from '../actions';
import navStore from './Navbar.store';
import AuthService from '../components/AuthService';
import _ from "lodash";

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: "",
            email: "",
            password: "",
            lock: false,
            elements:[
                {
                    text:"Email",
                    id:"email",
                    name:"email",
                    type:"text"
                },
                {
                    text:"Password",
                    id:"password",
                    name:"password",
                    type:"password"
                }
            ]
        }
        this.Auth = new AuthService();
    }

    change(payload){
        const value = payload.value;
        let path = this.store;
        switch(payload.id){
            case "email":
                path.email = value;
                break;
            case "password":
                path.password = value;
                break;
            default:
                break;
        }
        this.e();
    }

    e(){
        this.emit("change");
    }

    login(){
        let path = this.store;
        path.lock = true; //prevent double requests
        fetch('authentication/login',{
            method: 'POST',
            body:JSON.stringify({
                email: path.email,
                password: path.password
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then(res => res.json()).then(token => {
            if(!_.isEmpty(token)){
                localStorage.setItem('token', token);
                path.feedback = "Successful Login!";
                path.lock = true;
                actions.start("NAVBAR",{
                    classification:this.Auth.getClassByToken(token)
                });
                navStore.emit("change");
                this.e();
                window.location = "account";
            }else{
                path.feedback = "Username or password is incorrect";
                path.lock = false;
            }
            this.e();
        }).catch(err => {
            path.feedback = "An error has occurred";
            path.lock = false;
            console.log(err.message);
            this.e();
        });
    }

    
    getAll(){
        return this.store;
    }

    actionHandler(action){
        switch(action.type){
            case "LOGIN_CHANGE":
                this.change(action.payload);
                break;
            case "LOGIN_SUBMIT":
                this.login();
                break;
            default:
                break;
        }
    }
}

const store = new Store();
dispatcher.register(store.actionHandler.bind(store));
export default store;
