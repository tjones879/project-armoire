import React from 'react';
import {Component} from 'react';
import {Navbar} from '../components/Navbar';
import {AccountInfoBox} from '../components/AccountInfoBox.component.react';

export class AccountPage extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <AccountInfoBox />
            </div>
        );
    }
}