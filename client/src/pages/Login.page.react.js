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
            <div>
                <h1 className="text-center">Login Page</h1>
                <LoginForm elements={this.state.elements} feedback={this.state.feedback} lock={this.state.lock}/>
            </div>
        );
    }
}