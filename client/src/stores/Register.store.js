import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class Store extends EventEmitter{
    constructor(){
        super();
        this.store = {
            feedback: "",
            lock:true,
            first: {
                feed:null,
                value:"",
                style:null,
                lock:false
            },
            last:{
                feed:null,
                value:"",
                style:null,
                lock:false
            },
            email:{
                value:"",
                feed:null,
                lock:null,
            },
            pass:{
                feed:null,
                value:"",
                style:null,
                lock:false
            },
            confirm:{
                feed:null,
                value:"",
                style:null,
                lock:false
            },
            classification:{
                value:"",
                lock:false
            }
        }
        this.namReg = /^[a-zA-Z'\- ]{2,35}$/;
        this.emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.passReg = /^.{8,30}$/;
    }
    

    getAll(){
        return this.store;
    }   

    checkName(name, fol){
        /* fol stands for "first or last" */
        if(name.length < 2)
            return `${fol} name must be at least 2 characters.`;
        else if(name.length > 35)
            return `${fol} name must be 35 characters or less.`;
        else if(!this.namReg.test(name))
            return `${fol} name must be letters, hyphens, single quotes, and spaces.`;
        else
            return name;
    }

    

    change(payload){
        const value = payload.value;
        let path = this.store;

        switch(payload.id){
            case "cPassword":
                path.confirm.value = path.confirm.feed = value;
                this.checkPasses();

                break;
            case "email":
                path.email.value = value;
                path.email.feed = value.toLowerCase();
                break;
            case "fname":
                path.first.value = value;
                path.first.feed = this.checkName(value, "First");

                if(path.first.feed === value)
                    path.first.style = {color:"green"};
                else
                    path.first.style = {color:"red"};

                break;
            case "lname":
                path.last.value = value;
                path.last.feed = this.checkName(value, "Last");

                if(path.last.feed === value)
                    path.last.style = {color:"green"};
                else
                    path.last.style = {color:"red"};

                break;
            case "password":
                path.pass.value = path.pass.feed = value;

                if(this.passReg.test(value)){
                    path.pass.style = {color:"green"};
                    path.pass.feed = value.length.toString();
                }else{
                    path.pass.style = {color:"red"};
                    path.pass.feed = "Password must be 8 to 30 characters long";
                }

                this.checkPasses();

                break;
            case "professor":
                path.classification.value = value;
                break;
            case "student":
                path.classification.value = value;
                break;
            default:
                break;
        }

        this.checkFields();
        this.emit("change");
    }
    
    checkPasses(){
        let path = this.store;

        if(path.pass.value === path.confirm.value){
            path.confirm.feed = "Passwords Match!";
            path.confirm.style = {color:"green"};
        }else{
            path.confirm.feed = "Passwords do not match";
            path.confirm.style = {color:"red"};
        }
    };

    checkFields(){
        let path = this.store;
        if(
            this.namReg.test(path.first.value) &&
            this.namReg.test(path.last.value) &&
            this.emailReg.test(path.email.value) &&
            this.passReg.test(path.pass.value) &&
            path.pass.value === path.confirm.value &&
            path.classification.value
        ){
            path.lock = false;
            return true;
        }else{
            path.lock = true;
            return false;
        }
    }

    lockdown(){
        let path = this.store;
        path.lock = true;
        path.first.lock = true;
        path.last.lock = true;
        path.email.lock = true;
        path.pass.lock = true;
        path.confirm.lock = true;
        path.classification.lock = true;
        this.emit("change");
    }

    submit(){
        let path = this.store;
        if(this.checkFields()){
            path.feedback = null;
            fetch("authentication/registration",{
                method: "POST",
                body:JSON.stringify({
                    first: path.first.value,
                    last: path.last.value,
                    email: path.email.value,
                    password: path.pass.value,
                    confirm: path.confirm.value,
                    classification: path.classification.value
                }),
                headers: {
                    'content-type':'application/json'
                }
            }).then(x => x.json()).then(payload => {
                if(payload.success){
                    path.feedback = `Successfully registered under the email ${payload.email} as a ${payload.classification}. You will be redirected in 5 seconds...`;
                    this.lockdown()
                    setTimeout(()=>{
                        window.location = 'login';
                    }, '5000');
                }else{
                    if(payload.errType === "duplicate")
                        path.feedback = `The email ${payload.email} has already been registered`;
                    else if(payload.errType === "not filled out")
                        path.feedback = "Form must be filled out";
                    else if(payload.errType === "general")
                        path.feedback = "An error has occured";
                }
            }).catch(err=>{
                console.log(err.message);
                path.feedback = "An error has occured";
            });
        }else
            path.feedback = "Must fill out all fields correctly";
        this.emit("change");
    }

    actionHandler(action){
        switch(action.type){
            case "REGISTER_CHANGE":
                this.change(action.payload);
                break;
            case "REGISTER_SUBMIT":
                this.submit();
                break;
            default:
                break;
        }
    }
};

const store = new Store();
dispatcher.register(store.actionHandler.bind(store));
export default store;