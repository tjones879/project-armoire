import React, {Component} from 'react'
import store from '../stores/Register.store';
import AuthService from '../AuthService';
import * as actions from '../actions';
import {Btn} from '../components/Btn.component.react';
import Input from '../components/RegisterInput.component.react';

export class RegisterForm extends Component{
    constructor(){
        super();
        this.state =  store.getAll();
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            window.location = "login";
        store.on("change", () =>
            this.setState(store.getAll())
        );
    }
    submit(event){
        actions.submit("REGISTER");
        event.preventDefault();
    }
    change(event){
        actions.change("REGISTER", event.target.id, event.target.value);
    }
    render(){
        return(
            <form onSubmit={this.submit}>
                <h1 className="text-center heading">Register for Project Armoire</h1>
                <Input text="First Name" element={this.state.first} id="fname" event={this.change} type="text"/>
                <Input text="Last Name" element={this.state.last} id="lname" event={this.change} type="text"/>
                <Input text="Email" element={this.state.email} id="email" event={this.change} type="text"/>
                <Input text="Password" element={this.state.pass} id="password" event={this.change} type="password"/>
                <Input text="Confirm Password" element={this.state.confirm} id="cPassword" event={this.change} type="password"/>
                <div className="row text-center">
                    <span className="col heading">Classification (pick one)</span>
                </div>
                <div className="row text-center">
                    <label htmlFor="student" className="col text-center label-div">
                        <div className="label-chk">Student</div><input type="radio" name="classification" value="student" id="student" onClick={this.change} disabled={this.state.classification.lock}/>
                    </label>
                    <label htmlFor="professor" className="col text-center label-div">
                        <div className="label-chk">Professor</div><input type="radio" name="classification" value="professor" id="professor" onClick={this.change} disabled={this.state.classification.lock} />
                    </label>
                </div>
                <div className="row text-center">
                    <span id="classificationFeedback" className="col text-center feedback">{this.state.classification.value}</span>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <span id="loading">{this.state.loading}</span>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <Btn text="Register" id="registerBtn" class="button" type="submit" disabled={this.state.lock}/>
                    </div>
                </div>
                <div className="row text-center feedback">
                    <div id="userFeedback" className="col">
                        {this.state.feedback}
                    </div>
                </div>
                <div className="under-note text-center">
                    Already registered? &nbsp; <a className="link" href="login">Log in here</a>
                </div>
            </form>
        );
    }
}

