import React, {Component} from 'react';
import {RegisterForm} from '../containers/RegisterForm.container.react';

export class RegisterPage extends Component{
    render(){
        return(
            <div className="content-area">
                <RegisterForm />
            </div>
        );
    }
}