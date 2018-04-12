import React, {Component} from 'react'
import store from '../stores/Register.store';
import AuthService from '../components/AuthService';
import * as actions from '../actions/actions';

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
                <div className="row">
                    <label className="col text-right" htmlFor="fname">First</label>
                    <input className="col text-center" name="first" type="text" id="fname" placeholder="Jane" onChange={this.change} disabled={this.state.first.lock} required/>
                    <span className="col text-left" id="firstFeedback" style={this.state.first.style}>{this.state.first.feed}</span>
                </div>
                <div className="row">
                    <label className="col text-right" htmlFor="lname" >Last</label>
                    <input className="col text-center" name="last" type="text" id="lname" placeholder="Doe" onChange={this.change} disabled={this.state.last.lock} required/>
                    <span className="col text-left" id="lastFeedback" style={this.state.last.style}>{this.state.last.feed}</span>
                </div>
                <div className="row">
                    <label className="col text-right" htmlFor="email">Email</label>
                    <input onChange={this.change} className="col text-center" name="email" type="email" id="email" placeholder="jane.doe@somesite.com" disabled={this.state.email.lock} required/>
                    <span id="emailFeedback" className="col text-left">{this.state.email.feed}</span>
                </div>
                <div className="row">
                    <label className="col text-right" htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.pass.value} className="col text-center" onChange={this.change} disabled={this.state.pass.lock} required/>
                    <span id="passwordFeedback" className="col text-left" style={this.state.pass.style}>{this.state.pass.feed}</span>
                </div>
                <div className="row">
                    <label className="col text-right" htmlFor="cPassword">Re-Enter Password</label>
                    <input className="col text-center" name="confirm" value={this.state.confirm.value} id="cPassword" type="password" onChange={this.change} disabled={this.state.confirm.lock} required/>
                    <span id="confirmFeedback" className="col text-left" style={this.state.confirm.style}>{this.state.confirm.feed}</span>
                </div>
                <div className="row text-center">
                    <span className="col text-right">Classification</span>
                    <div className="col text-center">
                        <input type="radio" name="classification" value="student" id="student" onClick={this.change} disabled={this.state.classification.lock}/>Student<br />
                        <input type="radio" name="classification" value="professor" id="professor" onClick={this.change} disabled={this.state.classification.lock} />Professor<br />
                    </div>
                    <span id="classificationFeedback" className="col text-left">{this.state.classification.value}</span>
                </div>
                <div className="row text-center">
                    <div className="col-4 mx-auto">
                        <input id="registerBtn" className="btn btn-success" type="submit" value="Register" disabled={this.state.lock}/>
                    </div>
                </div>
                <div className="row text-center">
                    <div id="userFeedback" className="col-4 mx-auto">
                        {this.state.feedback}
                    </div>
                </div>
            </form>
        );
    }
}