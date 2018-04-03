import React from 'react';
import {Component} from 'react';
import {Btn} from '../components/Btn.component.react';
import {AccountInfoBox} from '../components/AccountInfoBox.component.react';
import * as Actions from '../actions/accountInfo.actions';
import {accountInfoStore} from '../stores/accountInfo.store';

export class AccountInfo extends Component{
    constructor(props){
        super(props);
        this.state = accountInfoStore.getAll();
    }
    componentWillMount(){
        accountInfoStore.on('change', () => {
            this.setState(accountInfoStore.getAll());
        });
        accountInfoStore.on('no clearance', () => {
            window.location = 'login';
        });
        Actions.checkLoginStatus();
        Actions.getUserData();
    }
    render(){
        return(
            <div>
                <AccountInfoBox user={{
                    fname: this.state.user.fname,
                    lname: this.state.user.lname,
                    email: this.state.user.email,
                    classification: this.state.user.classification 
                }}/>
                <div className='row text-center'>
                    <div className='col mx-auto'>
                        <Btn text='Change Info' id='changeInfoBtn' event={()=>{window.location = 'account_change'}}/>
                    </div>
                </div>
            </div>
        );
    }
}