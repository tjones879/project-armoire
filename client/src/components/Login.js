import React,{Component} from 'react'
import {Navbar} from './Navbar'
import loginStore from '../stores/loginStore';
import * as loginActions from '../actions/loginActions';

var rowClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
var loginAPIPath = "http://localhost:3000/";

export class LoginPage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <LoginForm />
            </div>
        );
    }
}

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: loginStore.getAll()
        }
        this.validate = this.validate.bind(this);
        this.emailEvent = this.emailEvent.bind(this);
        this.passwordEvent = this.passwordEvent.bind(this);
    }
    componentWillMount(){
        loginStore.on("change", () => {
            this.setState({store: loginStore.getAll()})
        });
    }
    emailEvent(e){
        loginActions.updateValue("email", e.target.value);
    }
    passwordEvent(e){
        loginActions.updateValue("password", e.target.value);
    }
    validate(){
        loginActions.login();
    }
    render(){
        return(
            <div className="container-fluid">
                    <h1 className="text-center">Login Page</h1>
                    <form>
                        <div className="row">
                            <label className={`${rowClass} text-right`} for="emailInput" >E-mail: </label>
                            <input name="email" className={`${rowClass} text-center`} type="email" onChange={this.emailEvent} required/>
                        </div>
                        <div className="row">
                            <label name="password" className={`${rowClass} text-right`} for="passwordInput">Password:</label>
                            <input className={`${rowClass} text-center`} ref="password" required id="passwordInput" type="password" onChange={this.passwordEvent} />
                        </div>
                        <div className="row text-center">
                            <div className="col-3 mx-auto">
                                <input type="button" className="btn btn-success btn-sm" onClick={this.validate} value="Login"/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-3 mx-auto">
                                <span>{this.state.store.feedback}</span>
                            </div>
                        </div>
                    </form>
            </div>
        );
    }
}