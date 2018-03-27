import React, {Component} from 'react'
import {Navbar} from './Navbar'
import registerStore from '../stores/registerStore';
import * as registerActions from '../actions/registerActions';
import AuthService from './AuthService';

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

export class RegisterForm extends Component{
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
        this.emailchange = this.emailchange.bind(this);
        this.studentEvent = this.studentEvent.bind(this);
        this.professorEvent = this.professorEvent.bind(this);

        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn()){
            window.location = "http://localhost:3000/login";
        }
        registerStore.on("change", () => {
            this.setState({store: registerStore.getAll()});
        });
    }
    validate(){
        //Validate the form before it is sent by the HTML form using POST
        //Remember to return a value of true or false from this event handler
        //true alows the form to send, false prevents the form from submiting
        //return true;
        if(this.state.store.firstValue === this.checkName(this.state.store.firstValue,"first")){
            if(this.state.store.lastValue === this.checkName(this.state.store.lastValue, "last")){
                if(this.state.store.passValue.length >= 8 && this.state.store.passValue.length <= 30){
                    if(this.state.store.passValue === this.state.store.confirmValue){
                        if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.store.emailValue)){
                            if(this.state.store.classificationValue === "student" || this.state.store.classificationValue === "professor"){
                                registerActions.updateFeedback("user", "");
                                fetch(registerAPI,{
                                    method: 'POST',
                                    body:JSON.stringify({
                                        first: this.state.store.firstValue,
                                        last: this.state.store.lastValue,
                                        email: this.state.store.emailValue,
                                        password: this.state.store.passValue,
                                        confirm: this.state.store.confirmValue,
                                        classification: this.state.store.classificationValue
                                    }),
                                    headers: {
                                        'content-type':'application/json'
                                    }
                                }).then(function(a){
                                    return a.json();
                                }).then(function(json){
                                    if(json.success){
                                        registerActions.updateFeedback("user", `Successfully registered under the email ${json.email} as a ${json.classification}`);
                                        registerActions.lockDown();
                                    }else{
                                        if(json.errType === "duplicate"){
                                            registerActions.updateFeedback("user", `The email ${json.email} has already been registered`);
                                        }else if(json.errType === "not filled out"){
                                            registerActions.updateFeedback("user", "Form must be filled out");
                                        }else if(json.errType === "general"){
                                            registerActions.updateFeedback("user", "An error has occured");
                                        }
                                    }
                                }).catch(err=>{
                                    console.log(err);
                                });
                            }else{
                                registerActions.updateFeedback("user", "Must choose a classification");
                            }
                        }else{
                            registerActions.updateFeedback("user", "Must a valid email syntax");
                        }
                    }else{
                        registerActions.updateFeedback("user", "Passwords must match eachother");
                    }
                }else{
                    registerActions.updateFeedback("user", "Password must be at least 8 characters, and no more than 30 characters");
                }
            }else{
                this.state.store.firstValue.length === 0?registerActions.updateFeedback("user", "Must insert a last name"):registerActions.updateFeedback("user", "Must insert a valid last name");
            }
        }else{
            this.state.store.firstValue.length === 0?registerActions.updateFeedback("user", "Must insert a first name"):registerActions.updateFeedback("user", "Must insert a valid first name");
        }
    }
    checkConfirm(e){
        registerActions.updateValue("confirm", e.target.value);
        registerActions.checkPasses();
        registerActions.checkFields();
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
        registerActions.checkFields();
    }
    checkName(name, fol){
        /* fol stands for "first or last" */
        if(name.length < 2){
            return `${fol} name must be at least 2 characters.`;
        }
        else if(name.length > 35){
            return `${fol} name must be 35 characters or less.`;
        }
        else if(!reg.test(name)){
            return `${fol} name must be letters, hyphens, single quotes, and spaces.`;
        }else{
            return name;
        }
    }

    checkFirst(e){
        /*
        JSX automatically escapes sequences to prevent injection attacks
        */
        registerActions.updateValue("first", e.target.value);
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
        registerActions.checkFields();
    }
    checkLast(e){
        registerActions.updateValue("last", e.target.value);
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
        registerActions.checkFields();
    }
    emailchange(e){
        registerActions.updateFeedback("email", e.target.value);
        registerActions.updateValue("email", e.target.value);
        registerActions.checkFields();
    }
    studentEvent(e){
        registerActions.updateValue("classification", e.target.value);
        registerActions.checkFields();
    }
    professorEvent(e){
        registerActions.updateValue("classification", e.target.value);
        registerActions.checkFields();
    }
    render(){
        return(
            <form>
                <h1 className="text-center">Registration</h1>
                <div className="row">
                    <label className={`${row} text-right`} htmlFor="1">First</label>
                    <input className={`${row} text-center`} name="first" type="text" id="1" placeholder="Jane" onChange={this.checkFirst} disabled={this.state.store.firstLock} required/>
                    <span className={`${row} text-left`} id="firstFeedback" style={this.state.store.firstStyle}>{this.state.store.firstFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} htmlFor="2" >Last</label>
                    <input className={`${row} text-center`} name="last" type="text" id="2" placeholder="Doe" onChange={this.checkLast} disabled={this.state.store.lastLock} required/>
                    <span className={`${row} text-left`} id="lastFeedback" style={this.state.store.lastStyle}>{this.state.store.lastFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} htmlFor="3">Email</label>
                    <input onChange={this.emailchange} className={`${row} text-center`} name="email" type="email" id="3" placeholder="jane.doe@somesite.com" disabled={this.state.store.emailLock} required/>
                    <span id="emailFeedback" className={`${row} text-left`}>{this.state.store.emailFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} htmlFor="4">Password</label>
                    <input type="password" id="4" name="password" value={this.state.store.passValue} className={`${row} text-center`} onChange={this.checkPass} disabled={this.state.store.passLock} required/>
                    <span id="passwordFeedback" className={`${row} text-left`} style={this.state.store.passStyle}>{this.state.store.passFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} htmlFor="5">Re-Enter Password</label>
                    <input className={`${row} text-center`} name="confirm" value={this.state.store.confirmValue} id="5" type="password" onChange={this.checkConfirm} disabled={this.state.store.confirmLock} required/>
                    <span id="confirmFeedback" className={`${row} text-left`} style={this.state.store.confirmStyle}>{this.state.store.confirmFeed}</span>
                </div>
                <div className="row text-center">
                    <span className={`${row} text-right`}>Classification</span>
                    <div className={`${row} text-center`}>
                        <input type="radio" name="classification" value="student" onClick={this.studentEvent} disabled={this.state.store.classificationLock}/>Student<br />
                        <input type="radio" name="classification" value="professor" onClick={this.professorEvent} disabled={this.state.store.classificationLock} />Professor<br />
                    </div>
                    <span id="classificationFeedback" className={`${row} text-left`}>{this.state.store.classificationValue}</span>
                </div>
                <div className="row text-center">
                    <div className="col-4 mx-auto">
                        <input id="registerBtn" className="btn btn-success" type="button" onClick={this.validate} value="Register" disabled={this.state.store.lock}/>
                    </div>
                </div>
                <div className="row text-center">
                    <div id="userFeedback" className="col-4 mx-auto">
                        {this.state.store.userFeedback}
                    </div>
                </div>
            </form>
        );
    }
}