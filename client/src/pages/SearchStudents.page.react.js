import React, {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {SearchStudentsContainer} from '../containers/SearchStudents.container.react';

import AuthService from '../components/AuthService';
import * as Actions from '../actions/actions';

export class SearchStudentsPage extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            window.location = "login";
        }else{
            Actions.user("SEARCH_STUDENT", this.Auth.getInfo());
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