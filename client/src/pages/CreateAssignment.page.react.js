import React from 'react';
import {Component} from 'react';

import {CreateAssignment} from '../containers/CreateAssignment.container.react';

import AuthService from '../AuthService';

export class CreateAssignmentPage extends Component{
    constructor(){
        super();
        this.state = {
            user: {
                id: "",
                email: "",
                classification: ""
            }
        };
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn()){
            const user = this.Auth.getInfo().user;
            this.setState({user});
        }else{
            window.location = '../login';
        }
    }
    render(){
        return(
            <div>
                <CreateAssignment user={this.state.user} title="Create Assignment"/>
            </div>
        );
    }
}