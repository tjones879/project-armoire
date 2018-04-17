import React from 'react';
import {Component} from 'react';
import {AccountInfo} from '../containers/AccountInfo.container.react';
import {Btn} from '../components/Btn.component.react';
import AuthService from '../components/AuthService';
import * as actions from '../actions';

export class AccountPage extends Component{
    constructor(){
        super();
        this.Auth = new AuthService();
        this.logout = this.logout.bind(this);
    }
    componentWillMount(){
        if(!this.Auth.loggedIn())
            window.location = "login";
        else
            actions.start("ACCOUNT_INFO", {id:this.Auth.getInfo().user.id,email:this.Auth.getInfo().user.email, token:this.Auth.getToken()});
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