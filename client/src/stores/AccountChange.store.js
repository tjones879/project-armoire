import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import _ from 'lodash';

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            user: {
                id:"",
                login_id:"",
                email:"",
                classification:"",
                token:"",
                fname:"",
                lname:""
            },
            elements:[
                {
                    text: "First Name",
                    id:"fname",
                    name:"fname",
                    type:"text",
                    value:""
                },
                {
                    text: "Last Name",
                    id:"lname",
                    name:"lname",
                    type:"text",
                    value:""
                },
                {
                    text: "Email",
                    id:"email",
                    name:"email",
                    type:"text",
                    value:""
                },
                {
                    text: "Confirm Password",
                    id:"password",
                    name:"password",
                    type:"password",
                    value:""
                }
            ]
        }
    }
    getAll(){
        return this.store;
    }
    start(payload){
        let path = this.store.user;
        let path2 = this.store.elements;
        path.login_id = payload.id;
        path.email = path2[2].value = payload.email;
        path.classification = payload.classification;
        path.token = payload.token;
        fetch(`../${path.classification}/login_id/${path.login_id}`).then(res => res.json()).then(payload => {
            path.id = payload._id;
            path.fname = path2[0].value = payload.fname;
            path.lname = path2[1].value = payload.lname;
            this.emit("change");
        }).catch(err => {});
    }
    submit(){
        const path = this.store.user;
        const path2 = this.store.elements;
        fetch(`../${path.classification}/update`, {
            method:"POST",
            body:JSON.stringify({
                id:path.id,
                login_id:path.login_id,
                email:path2[2].value,
                fname:path2[0].value,
                lname:path2[1].value,
                password:path2[3].value
            }),
            headers:{
                "content-type":"application/json",
                "authorization":`Bearer ${path.token}`
            }
        }).then(res => res.json()).then(payload => {
            if(!_.isEmpty(payload)){
                localStorage.removeItem("token");
                localStorage.setItem("token", payload);
                window.location = "../account";
            }
        }).catch(err => {});
    }
    change(payload){
        let path = this.store.elements;
        const value = payload.value;
        switch(payload.id){
            case "fname":
                path[0].value = value;
                break;
            case "lname":
                path[1].value = value;
                break;
            case "email":
                path[2].value = value;
                break;
            case "password":
                path[3].value = value;
                break;
            default:
                break;
        }
        this.emit("change");
    }
    actionHandler(action){
        switch(action.type){
            case "ACCOUNT_CHANGE_START":
                this.start(action.payload);
                break;
            case "ACCOUNT_CHANGE_CHANGE":
                this.change(action.payload);
                break;
            case "ACCOUNT_CHANGE_SUBMIT":
                this.submit();
                break;
            default:
                break;
        }
    }
}

const store = new Store();
dispatcher.register(store.actionHandler.bind(store));
export default store;