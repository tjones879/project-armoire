import React,{Component} from 'react'
import {Navbar} from './Navbar'


//Dalton Neely

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
            feedback: ""
        }
        this.validate = this.validate.bind(this);
    }
    validate(){
        //Validate the form before it is sent by the HTML form using POST
        //Remember to return a value of true or false from this event handler
        //true alows the form to send, false prevents the form from submiting
    }
    render(){
        return(
            <div className="container-fluid">
                    <h1 className="text-center">Login Page</h1>
                    <form action={loginAPIPath} method='POST' onsubmit={`return ${this.validate}`}>
                        <div className="row">
                            <label className={`${rowClass} text-right`} for="emailInput" >E-mail: </label>
                            <input name="email" className={`${rowClass} text-center`} type="email" required ref="email"/>
                        </div>
                        <div className="row">
                            <label name="password" className={`${rowClass} text-right`} for="passwordInput">Password:</label>
                            <input className={`${rowClass} text-center`} ref="password" required id="passwordInput" type="password" />
                        </div>
                        <div className="row text-center">
                            <div className="col-3 mx-auto">
                                <input type="submit" className="btn btn-success btn-sm" value="Login"/>
                            </div>
                        </div>
                    </form>
            </div>
        );
    }
}