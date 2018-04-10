import React from 'react';
import {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {CreateAssignment} from '../containers/CreateAssignment.container.react';

import AuthService from '../components/AuthService';

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
            window.location = 'login';
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <CreateAssignment user={this.state.user} title="Create Assignment"/>
            </div>
        );
    }
}