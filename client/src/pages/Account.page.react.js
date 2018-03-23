import React from 'react';
import {Component} from 'react';
import {Navbar} from '../components/Navbar';
import {AccountInfo} from '../containers/AccountInfo.container.react';

export class AccountPage extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <AccountInfo />
            </div>
        );
    }
}