import React, {Component} from 'react'

var registerAPI = "localhost:3000/";

var row = "col-lg-4 col-md-4";

// First and Last name should be a max of 35 characters, suggested by the UK government data standards catalogue
var reg = new RegExp('^[a-zA-Z\'\\- ]{2,35}$');

export default class Register extends Component{
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
        this.checkFirst = this.checkFirst.bind(this);
        this.checkLast = this.checkLast.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
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
            return fol+" name must be at least 2 characters. ";
        }
        else if(name.length > 35){
            return fol+" name must be 35 characters or less. ";
        }
        else if(!reg.test(name)){
            return fol+" name must be letters, hyphens, single quotes, and spaces. ";
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
            <form action={registerAPI} method="POST" className="container-fluid">
                <h1 className="row text-center">Registration</h1>
                <div className="row">
                    <label className={row+" text-right"} for="first">First</label>
                    <input className={row+" text-center"} type="text" id="first" placeholder="Jane" onChange={this.checkFirst} required/>
                    <span className={row+" text-left"} style={this.state.firstStyle}>{this.state.firstFeed}</span>
                </div>
                <div className="row">
                    <label className={row+" text-right"} for="last" >Last</label>
                    <input className={row+" text-center"} type="text" id="last" placeholder="Doe" onChange={this.checkLast} required/>
                    <span className={row+" text-left"} style={this.state.lastStyle}>{this.state.lastFeed}</span>
                </div>
                <div className="row">
                    <label className={row+" text-right"} for="email">Email</label>
                    <input className={row+" text-center"} type="email" id="email" placeholder="jane.doe@somesite.com" required/>
                    {/* add feedback */}
                </div>
                <div className="row">
                    <label className={row+" text-right"} for="password">Password</label>
                    <input type="password" id="password" value={this.state.passValue} className={row+" text-center"} onChange={this.checkPass} required/>
                    <span className={row+" text-left"} style={this.state.passStyle}>{this.state.passFeed}</span>
                </div>
                <div className="row">
                    <label className={row+" text-right"} for="confirm">Re-Enter Password</label>
                    <input className={row+" text-center"} value={this.confirmValue} id="confirm" type="password" onChange={this.checkConfirm} required/>
                    <span className={row+" text-left"} style={this.state.confirmStyle}>{this.state.confirmFeed}</span>
                </div>
                <div className="row text-center">
                    <input className="btn btn-success" type="submit" value="Register" disabled={this.state.lock}/>
                </div>
            </form>
        );
    }
}