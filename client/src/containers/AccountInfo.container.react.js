import React from 'react';
import {Component} from 'react';
import {Btn} from '../components/Btn.component.react';
import {AccountInfoBox} from '../components/AccountInfoBox.component.react';
import * as Actions from '../actions/accountInfo.actions';
import {accountInfoStore} from '../stores/accountInfo.store';

export class AccountInfo extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        accountInfoStore.on('change', () => {
            this.setState(accountInfoStore.getAll());
        });
        accountInfoStore.on('no clearance', () => {
            window.location = 'login';
        });
        Actions.checkLoginStatus();
    }
    render(){
        return(
            <div>
                <AccountInfoBox />
                <Btn />
            </div>
        );
    }
}