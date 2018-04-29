import React,{Component} from 'react';
import store from '../stores/Login.store';
import AuthService from '../AuthService';
import {LoginForm} from '../containers/Login.container.react';

export class LoginPage extends Component{
    constructor(){
        super();
        this.state = store.getAll();
        this.Auth = new AuthService();
    }

    componentWillMount(){
        if(this.Auth.loggedIn())window.location = "account";
        store.on("change", () => {
            this.setState(store.getAll());
        });
    }

    render(){
        return(
            <div className="content-area">
                <h1 className="text-center heading">Log In to Project Armoire</h1>
                <LoginForm loading={this.state.loading} feedback={this.state.feedback} lock={this.state.lock}/>
                <div className="under-note text-center">
                    Hello stranger! Never been here before? &nbsp; <a className="link" href="register">Sign up now</a>
                </div>
            </div>
        );
    }
}