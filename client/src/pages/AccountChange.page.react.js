import React, {Component} from 'react';

import AuthService from '../components/AuthService';
import * as Actions from '../actions/actions';
import store from '../stores/AccountChange.store';

import {Navbar} from '../components/Navbar';
import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';

export class AccountChangePage extends Component{
    constructor(){
        super();
        this.state = store.getAll();
        this.Auth = new AuthService();
    }
    componentWillMount(){
        store.on("change", () => {
            this.setState(store.getAll());
        });
        const user = this.Auth.getInfo().user;
        Actions.start("ACCOUNT_CHANGE", user);
    }
    submit(event){
        Actions.submit("ACCOUNT_CHANGE");
        event.preventDefault();
    }
    change(event){
        Actions.change("ACCOUNT_CHANGE", event.target.id, event.target.value);
    }
    render(){
        return(
            <div>
                <Navbar />
                <form onSubmit={this.submit}>
                    <Input text="First Name" id="fname" name="fname" value={this.state.info.fname} event={this.change} />
                    <Input text="Last Name" id="lname" name="lname" value={this.state.info.lname} event={this.change}/>
                    <Input text="Email" id="email" name="email" value={this.state.user.email} event={this.change}/>
                    <Input text="Confirm Password" type="password" id="password" name="password" value={this.state.password} event={this.change}/>
                    <div className="row text-center">
                        <div className="col">
                            <Btn type="submit" text="Change Info" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}