import React from 'react'
import ReactDOM from 'react-dom'
import bootstrap, { Grid, Row, Col, Button } from 'react-bootstrap';


//Dalton Neely

var rowClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
var loginAPIPath = "http://localhost:3000/";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "Login Page",
            btn: "btn btn-success btn-sm",
            feedback: ""
        }
        this.updateEmailFeed = this.updateEmailFeed.bind(this);
        this.postRequestEvent = this.postRequestEvent.bind(this);
    }
    postRequestEvent(){

        // this event handler still needs to include password hashing and salting before
        // the data is sent over the server to prevent man in the middle attacks

        // This post request sends a json object with the {email: <input>, password: <input>}
        // It expects a response of a json object with {login: [true|false]} depending on if the user
        // was able to login or not

        fetch(loginAPIPath, {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: ReactDOM.findDOMNode(this.refs.email).value,
                password: ReactDOM.findDOMNode(this.refs.password).value
            })
        }).then((response) => response.json()).then((responseJson) =>{
            (responseJson.login)? console.log("successful login"): console.log("unsuccessful login");
        }).catch((error)=>{
            console.log(error.toString());
        });
    }
    updateEmailFeed(e){

        //Need to set up data sanitation and validation here

        //var pattern = new RegExp("^[a-zA-Z0-9.]+[@]{1}[a-zA-Z0-9.]+[.a-z]{3,}$");
        //(pattern.test(e.target.value.toString()))? this.setState({color:{"color":"green"}}): this.setState({color:{"color":"red"}});
        this.setState({feedback: e.target.value});
    }
    render(){
        return(
            <div className="container-fluid">
                    <h1 className="text-center">{this.state.title}</h1>
                    <form onsubmit={this.postRequestEvent}>
                        <div className="row">
                            <label className={rowClass + " text-right"} for="emailInput" >E-mail: </label>
                            <input className={rowClass + " text-center"} type="email" required ref="email" onChange={this.updateEmailFeed}/>
                            <span className={rowClass + " text-left"}>{this.state.feedback}</span>
                        </div>
                        <div className="row">
                            <label className={rowClass + " text-right"} for="passwordInput">Password:</label>
                            <input className={rowClass + " text-center"} ref="password" required id="passwordInput" type="password" />
                        </div>
                        <div className="row text-center">
                            <input type="submit" className={this.state.btn} value="Login"/>
                        </div>
                    </form>
            </div>
        );
    }
}

export default Login;