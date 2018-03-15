import React, {Component} from 'react'
import {Navbar} from './Navbar'
import registerStore from '../stores/registerStore';
import * as registerActions from '../actions/registerActions';

var registerAPI = "http://localhost:3000/authentication/registration";

var row = "col";

// First and Last name should be a max of 35 characters, suggested by the UK government data standards catalogue
var reg = new RegExp('^[a-zA-Z\'\\- ]{2,35}$');

export class RegisterPage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <RegisterForm />
            </div>
        );
    }
}

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: registerStore.getAll()
        };
        this.validate = this.validate.bind(this);
        this.checkFirst = this.checkFirst.bind(this);
        this.checkLast = this.checkLast.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
    }
    componentWillMount(){
        registerStore.on("change", () => {
            this.setState(registerStore.getAll());
        });
    }
    validate(){
        //Validate the form before it is sent by the HTML form using POST
        //Remember to return a value of true or false from this event handler
        //true alows the form to send, false prevents the form from submiting
        return true;
    }
    checkConfirm(e){
        registerActions.updateValue("confirm", e.target.value);
        registerActions.checkPasses();
    }
    checkPass(e){
        let regex = new RegExp("^[a-zA-Z0-9@\\\\#$%&*()_+\\]\\[';:?.,!^-]{8,30}$");
        let feedback = "";
        let style = {};
        registerActions.updateValue("password", e.target.value);
        if(regex.test(e.target.value)){
            style = {color:"green"};
            feedback = e.target.value.length;
            registerActions.setLock(false);
        }else{
            style = {color:"red"};
            feedback = "Password must be 8 to 30 characters long";
            registerActions.setLock(true);
        }
        registerActions.updateFeedback("password", feedback);
        registerActions.updateStyle("password", style);
        registerActions.checkPasses();
    }
    checkName(name, fol){
        /* fol stands for "first or last" */
        if(name.length < 2){
            return `${fol} name must be at least 2 characters. `;
        }
        else if(name.length > 35){
            return `${fol} name must be 35 characters or less. `;
        }
        else if(!reg.test(name)){
            return `${fol} name must be letters, hyphens, single quotes, and spaces. `;
        }else{
            return name;
        }
    }

    checkFirst(e){
        /*
        JSX automatically escapes sequences to prevent injection attacks
        */
        let feedback = this.checkName(e.target.value, "First");
        let style = {};
        if(feedback === e.target.value){
            style = {color:"green"};
            registerActions.setLock(false);
        }else{
            style = {color:"red"};
            registerActions.setLock(true);
        }
        registerActions.updateFeedback("first", feedback);
        registerActions.updateStyle("first", style);
    }
    checkLast(e){
        let feedback = this.checkName(e.target.value, "Last");
        let style = {};
        if(feedback === e.target.value){
            style = {color: "green"};
            registerActions.setLock(false);
        }else{
            style = {color: "red"};
            registerActions.setLock(true);
        }
        registerActions.updateFeedback("last", feedback);
        registerActions.updateStyle("last", style);
    }
    render(){
        return(
            <form action={registerAPI} method="POST" onsubmit={`return ${this.validate}`} >
                <h1 className="text-center">Registration</h1>
                <div className="row">
                    <label className={`${row} text-right`} for="1">First</label>
                    <input className={`${row} text-center`} name="first" type="text" id="1" placeholder="Jane" onChange={this.checkFirst} required/>
                    <span className={`${row} text-left`} style={this.state.store.firstStyle}>{this.state.store.firstFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="2" >Last</label>
                    <input className={`${row} text-center`} name="last" type="text" id="2" placeholder="Doe" onChange={this.checkLast} required/>
                    <span className={`${row} text-left`} style={this.state.store.lastStyle}>{this.state.store.lastFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="3">Email</label>
                    <input className={`${row} text-center`} name="email" type="email" id="3" placeholder="jane.doe@somesite.com" required/>
                    <span className={`${row} text-left`}></span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="4">Password</label>
                    <input type="password" id="4" name="password" value={this.state.store.passValue} className={`${row} text-center`} onChange={this.checkPass} required/>
                    <span className={`${row} text-left`} style={this.state.store.passStyle}>{this.state.passFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="5">Re-Enter Password</label>
                    <input className={`${row} text-center`} name="confirm" value={this.confirmValue} id="5" type="password" onChange={this.checkConfirm} required/>
                    <span className={`${row} text-left`} style={this.state.confirmStyle}>{this.state.confirmFeed}</span>
                </div>
                <div className="row text-center">
                    <div className="col-4 mx-auto">
                        <input className="btn btn-success" type="submit" value="Register" disabled={this.state.lock}/>
                    </div>
                </div>
            </form>
        );
    }
}