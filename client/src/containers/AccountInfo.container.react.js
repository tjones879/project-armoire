import React from 'react';
import {Component} from 'react';
import {Btn} from '../components/Btn.component.react';
import {AccountInfoBox} from '../components/AccountInfoBox.component.react';
import {accountInfoStore} from '../stores/accountInfo.store';

export class AccountInfo extends Component{
    constructor(props){
        super(props);
        this.state = accountInfoStore.getAll();
    }
    componentWillMount(){
        accountInfoStore.on("change", () => 
            this.setState(accountInfoStore.getAll())
        )
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
                        <Btn text='Change Info' id='changeInfoBtn' event={()=>{window.location = 'account/change'}}/>
                    </div>
                </div>
            </div>
        );
    }
}