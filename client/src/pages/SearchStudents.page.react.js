import React, {Component} from 'react';

import {SearchStudentsContainer} from '../containers/SearchStudents.container.react';

import AuthService from '../AuthService';
import * as Actions from '../actions';

export class SearchStudentsPage extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            window.location = "../login";
        }else{
            Actions.start("SEARCH_STUDENT", this.Auth.getInfo().user);
        }
    }
    render(){
        return(
            <div className="content-area text-center">
                <SearchStudentsContainer title="Search Students"/>
            </div>
        );
    }
}