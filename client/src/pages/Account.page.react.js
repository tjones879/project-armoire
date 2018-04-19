import React, {Component} from 'react';
import {AccountInfo} from '../containers/AccountInfo.container.react';
import * as actions from '../actions';

export class AccountPage extends Component{
    componentWillMount(){
        actions.start("ACCOUNT_INFO", this.props.user);
    }
    render(){
        return(
            <div>
                <AccountInfo />
            </div>
        );
    }
}