import React, {Component} from 'react';

import {Navbar} from '../components/Navbar';

import AuthService from '../components/AuthService';

export class SearchStudentsPage extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            window.location = "login";
        }
    }
    render(){
        return(
            <div>
                <Navbar />
            </div>
        );
    }
}