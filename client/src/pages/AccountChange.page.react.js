import React, {Component} from 'react';

import * as actions from '../actions';
import store from '../stores/AccountChange.store';

import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';

export class AccountChangePage extends Component{
    constructor(){
        super();
        this.state = store.getAll();
    }
    componentWillMount(){
        store.on("change", () => {
            this.setState(store.getAll());
        });
        actions.start("ACCOUNT_CHANGE", this.props.user);
    }
    submit(event){
        actions.submit("ACCOUNT_CHANGE");
        event.preventDefault();
    }
    change(event){
        actions.change("ACCOUNT_CHANGE", event.target.id, event.target.value);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    {this.state.elements.map(element => 
                        <Input text={element.text} type={element.type} id={element.id} value={element.value} name={element.name} event={this.change} key={element.id} required={true}/>
                    )}
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