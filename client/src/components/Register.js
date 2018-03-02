import React, {Component} from 'react'

var registerAPI = "localhost:3000/";

var row = "col-lg-4 col-md-4";

export default class Register extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <form action={registerAPI} method="POST" className="container-fluid">
                <h1 className="row text-center">Registration</h1>
                <div className="row">
                    <label className={row+" text-right"} for="first">First Name</label>
                    <input className={row+" text-center"} type="text" id="first"/>
                </div>
                <div className="row">
                    <label className={row+" text-right"} for="last">Last Name</label>
                    <input className={row+" text-center"} type="text" id="last"/>
                </div>
            </form>
        );
    }
}