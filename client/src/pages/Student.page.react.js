import React, {Component} from 'react';

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
                <Btn text="Search Students" event={()=>{window.location = "search_students"}}/>
            </div>
        );
    }
}