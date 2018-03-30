import React,{Component} from 'react'
import {Navbar} from './Navbar'
import loginStore from '../stores/loginStore';
import * as loginActions from '../actions/loginActions';
import AuthService from './AuthService';

var rowClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";

export class LoginPage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <LoginForm />
            </div>
        );
    }
}

export class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: loginStore.getAll()
        }

        this.Auth = new AuthService();

        this.validate = this.validate.bind(this);
        this.emailEvent = this.emailEvent.bind(this);
        this.passwordEvent = this.passwordEvent.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
        loginStore.on("change", () => {
            this.setState({
                store: loginStore.getAll()
            });
        });
    }

    componentDidMount(){
        if(this.Auth.loggedIn()){
            loginActions.updateFeedback("feedback", "Already logged in!");
            loginActions.loggedIn();
        }
    }

    logout(){
        this.Auth.logout();
        loginActions.logout();
    }

    emailEvent(e){
        loginActions.updateValue("email", e.target.value);
    }

    passwordEvent(e){
        loginActions.updateValue("password", e.target.value);
    }

    validate(e){
        if(this.state.store.password === "" && this.state.store.email === ""){
            loginActions.updateFeedback("feedback", "Fields are empty!");
        }else if(this.state.store.password === ""){
            loginActions.updateFeedback("feedback", "Password field is empty!");
        }else if(this.state.store.email === ""){
            loginActions.updateFeedback("feedback", "Email field is empty");
        }else{
            loginActions.login();
            console.log("Logging in");
            if (this.Auth.loggedin())
                window.setTimeout(()=>{window.location = 'account'}, 1000);
        }
        e.preventDefault();
    }

    render(){
        return(
            <div className="container-fluid">
                    <h1 className="text-center">Login Page</h1>
                    <form onSubmit={this.validate}>
                        <div className="row">
                            <label className={`${rowClass} text-right`} htmlFor="emailInput" >E-mail: </label>
                            <input id="emailInput" name="email" className={`${rowClass} text-center`} type="email" onChange={this.emailEvent} disabled={this.state.store.emailLock} required/>
                        </div>
                        <div className="row">
                            <label name="password" className={`${rowClass} text-right`} htmlFor="passwordInput">Password:</label>
                            <input className={`${rowClass} text-center`} ref="password" required id="passwordInput" type="password" onChange={this.passwordEvent} disabled={this.state.store.passwordLock} />
                        </div>
                        <div className="row text-center">
                            <div className="col-3 mx-auto">
                                <input type="submit" id="loginBtn" className="btn btn-success btn-sm" disabled={this.state.store.buttonLock} value="Login"/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-3 mx-auto">
                                <span id="feedback">{this.state.store.feedback}</span>
                            </div>
                        </div>
                    </form>
                    <div className="row text-center">
                        <div className="col-3 mx-auto">
                            <button id="logoutBtn" className="btn btn-danger" style={this.state.store.logoutStyle} onClick={this.logout}>Logout</button>
                        </div>
                    </div>
            </div>
        );
    }
}
