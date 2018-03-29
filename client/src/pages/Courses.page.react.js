import React from 'react';
import {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {Btn} from '../components/Btn.component.react';

import AuthService from '../components/AuthService';

export class CoursePage extends Component{
    constructor(){
        super();
        this.state = {
            components: []
        }
        this.user = {};

        this.Auth = new AuthService();
    }
    componentWillMount(){
        this.user = this.Auth.getInfo().user;
        if(this.user.classification === 'professor'){
            console.log('professor');
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <Btn text='Create New Course' class='btn btn-light' event={()=>{window.location = "createcourse"}}/>
            </div>
        );
    }
}