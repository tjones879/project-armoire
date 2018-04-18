import {EventEmitter} from 'events';
import dispather from '../dispatcher';

import AuthService from '../AuthService';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            user: {},
            info: {},
            password: null
        }
        this.Auth = new AuthService();
    }
    getAll(){
        return this.store;
    }
    start(payload){
        this.store.user = payload;
        console.log(payload);
        fetch(`../${payload.classification}/login_id/${payload.id}`).then(res => res.json()).then(payload => {
            this.store.info = payload;
            this.emit("change");
        }).catch(err => {
            console.log(err.message);
        });
        this.emit("change");
    }
    submit(){
        fetch(`../${this.store.user.classification}/update`, {
            method:"POST",
            body:JSON.stringify({
                id:this.store.info._id,
                login_id:this.store.user.id,
                email:this.store.user.email,
                fname:this.store.info.fname,
                lname:this.store.info.lname,
                password:this.store.password
            }),
            headers:{
                "content-type":"application/json"
            }
        }).then(res => res.json()).then(payload => {
            if(payload != null){
                this.Auth.logout();
                this.Auth.addToken(payload.token);
                window.location = "../account";
            }
        }).catch(err => {
            console.log(err.message);
        });
    }
    change(payload){
        switch(payload.id){
            case "fname":{
                this.store.info.fname = payload.value;
                break;
            }
            case "lname":{
                this.store.info.lname = payload.value;
                break;
            }
            case "email":{
                this.store.user.email = payload.value;
                break;
            }
            case "password":{
                this.store.password = payload.value;
                break;
            }
            default:{
                break;
            }
        }
        this.emit("change");
    }
    actionHandler(action){
        switch(action.type){
            case "ACCOUNT_CHANGE_START":{
                this.start(action.payload);
                break;
            }
            case "ACCOUNT_CHANGE_CHANGE":{
                this.change(action.payload);
                break;
            }
            case "ACCOUNT_CHANGE_SUBMIT":{
                this.submit();
                break;
            }
            default:{
                break;
            }
        }
    }
}

const store = new Store();
dispather.register(store.actionHandler.bind(store));
export default store;