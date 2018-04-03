import React, {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {SearchStudentsContainer} from '../containers/SearchStudents.container.react';

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
                <SearchStudentsContainer title="Search Students"/>
            </div>
        );
    }
}