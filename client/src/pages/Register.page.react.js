import React, {Component} from 'react';
import {Navbar} from '../components/Navbar';
import {RegisterForm} from '../containers/RegisterForm.container.react';

export class RegisterPage extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <RegisterForm />
            </div>
        );
    }
}