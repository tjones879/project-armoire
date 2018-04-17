import React, {Component} from 'react'
import store from '../stores/Register.store';
import AuthService from '../components/AuthService';
import * as actions from '../actions/actions';
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
                <h1 className="text-center">Registration</h1>
                <Input text="First" element={this.state.first} id="fname" event={this.change} type="text"/>
                <Input text="Last" element={this.state.last} id="lname" event={this.change} type="text"/>
                <Input text="Email" element={this.state.email} id="email" event={this.change} type="text"/>
                <Input text="Password" element={this.state.pass} id="password" event={this.change} type="password"/>
                <Input text="Confirm Password" element={this.state.confirm} id="cPassword" event={this.change} type="password"/>
                <div className="row text-center">
                    <span className="col text-right">Classification</span>
                    <div className="col text-center">
                        <input type="radio" name="classification" value="student" id="student" onClick={this.change} disabled={this.state.classification.lock}/>Student<br />
                        <input type="radio" name="classification" value="professor" id="professor" onClick={this.change} disabled={this.state.classification.lock} />Professor<br />
                    </div>
                    <span id="classificationFeedback" className="col text-left">{this.state.classification.value}</span>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <Btn text="Register" id="registerBtn" class="btn btn-success" type="submit" disabled={this.state.lock}/>
                    </div>
                </div>
                <div className="row text-center">
                    <div id="userFeedback" className="col">
                        {this.state.feedback}
                    </div>
                </div>
            </form>
        );
    }
}

