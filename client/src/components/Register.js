import React, {Component} from 'react'
import {Navbar} from './Navbar'

var registerAPI = "http://localhost:3000/authentication/registration";

var row = "col";

// First and Last name should be a max of 35 characters, suggested by the UK government data standards catalogue
var reg = new RegExp('^[a-zA-Z\'\\- ]{2,35}$');

export class RegisterPage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <RegisterForm />
            </div>
        );
    }
}

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            lock:"true",
            firstFeed:"",
            firstStyle:{
                color:"green"
            },
            lastFeed:"",
            lastStyle:{
                color:"green"
            },
            passFeed:"",
            passValue:"",
            passStyle:{
                color:"green"
            },
            confirmFeed:"",
            confirmValue:"",
            confirmStyle:{
                color:"green"
            }
        }
        this.validate = this.validate.bind(this);
        this.checkFirst = this.checkFirst.bind(this);
        this.checkLast = this.checkLast.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
    }
    validate(){
        //Validate the form before it is sent by the HTML form using POST
        //Remember to return a value of true or false from this event handler
        //true alows the form to send, false prevents the form from submiting
        return true;
    }
    checkConfirm(e){
        this.setState({confirmValue:e.target.value});
        if(this.state.passValue === e.target.value){
            this.setState({confirmStyle:{color:"green"}});
            this.setState({confirmFeed:"They Match!"});
            this.setState({lock:false});
        }else{
            this.setState({confirmFeed:"Passwords do not match", confirmStyle:{color:"red"}});
            this.setState({lock:true});
        }
    }
    checkPass(e){
        var regex = new RegExp("^[a-zA-Z0-9@\\\\#$%&*()_+\\]\\[';:?.,!^-]{8,30}$");
        this.setState({passValue:e.target.value});
        if(regex.test(e.target.value)){
            this.setState({passStyle:{color:"green"}});
            this.setState({passFeed:e.target.value.length});
            this.setState({lock:false});
        }else{
            this.setState({passStyle:{color:"red"}});
            this.setState({passFeed:"Password must be 8 to 30 characters long"});
            this.setState({lock:true});
        }
    }
    checkName(name, fol){
        if(name.length < 2){
            return `${fol} name must be at least 2 characters. `;
        }
        else if(name.length > 35){
            return `${fol} name must be 35 characters or less. `;
        }
        else if(!reg.test(name)){
            return `${fol} name must be letters, hyphens, single quotes, and spaces. `;
        }else{
            return name;
        }
    }

    checkFirst(e){
        /*
        JSX automatically escapes sequences to prevent injection attacks
        */
        var feedback = this.checkName(e.target.value, "First");
        var feedColor;
        if(feedback === e.target.value){
            feedColor = "green";
            this.setState({lock:false});
        }else{
            feedColor = "red";
            this.setState({lock:true});
        }
        this.setState({firstFeed:feedback});
        this.setState({firstStyle:{color:feedColor}});
    }
    checkLast(e){
        var feedback = this.checkName(e.target.value, "Last");
        var feedColor;
        if(feedback === e.target.value){
            feedColor = "green";
            this.setState({lock:false});
        }else{
            feedColor = "red";
            this.setState({lock:true});
        }
        this.setState({lastFeed:feedback});
        this.setState({lastStyle:{color:feedColor}});
    }
    render(){
        return(
            <form action={registerAPI} method="POST" onsubmit={`return ${this.validate}`} >
                <h1 className="text-center">Registration</h1>
                <div className="row">
                    <label className={`${row} text-right`} for="1">First</label>
                    <input className={`${row} text-center`} name="first" type="text" id="1" placeholder="Jane" onChange={this.checkFirst} required/>
                    <span className={`${row} text-left`} style={this.state.firstStyle}>{this.state.firstFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="2" >Last</label>
                    <input className={`${row} text-center`} name="last" type="text" id="2" placeholder="Doe" onChange={this.checkLast} required/>
                    <span className={`${row} text-left`} style={this.state.lastStyle}>{this.state.lastFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="3">Email</label>
                    <input className={`${row} text-center`} name="email" type="email" id="3" placeholder="jane.doe@somesite.com" required/>
                    <span className={`${row} text-left`}></span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="4">Password</label>
                    <input type="password" id="4" name="password" value={this.state.passValue} className={`${row} text-center`} onChange={this.checkPass} required/>
                    <span className={`${row} text-left`} style={this.state.passStyle}>{this.state.passFeed}</span>
                </div>
                <div className="row">
                    <label className={`${row} text-right`} for="5">Re-Enter Password</label>
                    <input className={`${row} text-center`} name="confirm" value={this.confirmValue} id="5" type="password" onChange={this.checkConfirm} required/>
                    <span className={`${row} text-left`} style={this.state.confirmStyle}>{this.state.confirmFeed}</span>
                </div>
                <div className="row text-center">
                    <div className="col-4 mx-auto">
                        <input className="btn btn-success" type="submit" value="Register" disabled={this.state.lock}/>
                    </div>
                </div>
            </form>
        );
    }
}