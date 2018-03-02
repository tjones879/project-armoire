import React from 'react'


//Dalton Neely

var rowClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
var loginAPIPath = "http://localhost:3000/";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            feedback: ""
        }
        this.updateEmailFeed = this.updateEmailFeed.bind(this);
    }
    updateEmailFeed(e){
        this.setState({feedback: e.target.value});
    }
    render(){
        return(
            <div className="container-fluid">
                    <h1 className="text-center">Login Page</h1>
                    <form action={loginAPIPath} method='POST'>
                        <div className="row">
                            <label className={rowClass + " text-right"} for="emailInput" >E-mail: </label>
                            <input name="email" className={rowClass + " text-center"} type="email" required ref="email" onChange={this.updateEmailFeed}/>
                            <span className={rowClass + " text-left"}>{this.state.feedback}</span>
                        </div>
                        <div className="row">
                            <label name="password" className={rowClass + " text-right"} for="passwordInput">Password:</label>
                            <input className={rowClass + " text-center"} ref="password" required id="passwordInput" type="password" />
                        </div>
                        <div className="row text-center">
                            <input type="submit" className="btn btn-success btn-sm" value="Login"/>
                        </div>
                    </form>
            </div>
        );
    }
}

export default Login;