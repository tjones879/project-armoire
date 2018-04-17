import React, {Component} from 'react';
import * as actions from '../actions';
import {Btn} from '../components/Btn.component.react';
import {Input} from '../components/input.component.react';
import PropTypes from "prop-types";

export class LoginForm extends Component{
    change(event){
        actions.change("LOGIN", event.target.id, event.target.value);
    }
    submit(event){
        actions.submit("LOGIN");
        event.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.submit}>
                {this.props.elements.map(element => 
                    <Input key={element.id} text={element.text} type={element.type} id={element.id} name={element.name} required={true} event={this.change}/>
                )}
                <div className="row text-center">
                    <div className="col">
                        <Btn type="submit" id="loginBtn" class="btn btn-success btn-sm" disabled={this.props.lock} text="Login"/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <span id="feedback">{this.props.feedback}</span>
                    </div>
                </div>
            </form>
        );
    }
}

LoginForm.defaultProps = {
    elements: [
        {
            text:"Email",
            id:"email",
            name:"email",
            type:"text"
        },
        {
            text:"Password",
            id:"password",
            name:"password",
            type:"password"
        }
    ]
}

LoginForm.propTypes = {
    elements: PropTypes.array.isRequired
}