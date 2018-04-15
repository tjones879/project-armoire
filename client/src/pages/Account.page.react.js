import React from 'react';
import {Component} from 'react';
import {AccountInfo} from '../containers/AccountInfo.container.react';
import {Btn} from '../components/Btn.component.react';
import AuthService from '../components/AuthService';

export class AccountPage extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
        this.logout = this.logout.bind(this);
    }
    logout(){
        this.Auth.logout();
        window.location = 'login'
    }
    render(){
        return(
            <div>
                <AccountInfo />
                <div className='row text-center'>
                    <div className='col'>
                        <Btn type='button' text='Logout' event={this.logout}/>
                    </div>
                </div>
            </div>
        );
    }
}