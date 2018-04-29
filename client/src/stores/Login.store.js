import {EventEmitter} from "events";
import React from "react";
import dispatcher from "../dispatcher";
import * as actions from '../actions';
import navStore from './Navbar.store';
import AuthService from '../AuthService';
import _ from "lodash";

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: "",
            email: "",
            password: "",
            lock: false,
            loading: null
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
        path.loading = <img src="images/loading.gif" alt="loading gif" className="loading"/>;
        this.e();
        path.lock = true; //prevent double requests
        fetch('/api/v1/authentication/login',{
            method: 'POST',
            body:JSON.stringify({
                email: path.email,
                password: path.password
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then(res => res.json()).then(token => {
            path.loading = null;
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
            path.loading = null;
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
