import React, {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {Btn} from '../components/Btn.component.react';

import AuthService from '../components/AuthService';

export class StudentPage extends Component{
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
                <Btn text="Search Students" event={()=>{window.location = "search_students"}}/>
            </div>
        );
    }
}