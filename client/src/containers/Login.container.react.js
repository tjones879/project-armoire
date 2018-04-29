import React, {Component} from 'react';
import * as actions from '../actions';
import {Btn} from '../components/Btn.component.react';
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
                <div className="row text-center">
                    <div className="col">
                        <input className="default-input" placeholder="Email" type="email" id="email" name="email" required autoFocus autoComplete="on" onChange={this.change}/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <input className="default-input" placeholder="Password" type="password" id="password" name="password" required autoComplete="on" onChange={this.change}/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <span id="loading">{this.props.loading}</span>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <Btn type="submit" id="loginBtn" class="button" disabled={this.props.lock} text="Log in"/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col feedback">
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