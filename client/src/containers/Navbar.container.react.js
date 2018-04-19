import React, {Component} from 'react'
import AuthService from '../AuthService';
import {Btn} from '../components/Btn.component.react';
import * as Actions from '../actions';
import store from '../stores/Navbar.store';

export class Navbar extends Component{
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.state = store.getAll();
    }
    componentWillMount(){
        store.on("change", ()=>{
            this.setState(store.getAll());
        });
        if(this.Auth.loggedIn()){
            const userInfo = this.Auth.getInfo().user;
            Actions.start("NAVBAR", userInfo);
        }
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg pa-navbar">
                <a className="navbar-brand" href={`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}`}>Project Armoire</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><img alt="hamburger icon for dropdown menu" width='35' height='35' src={`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/images/hamburger.png`} /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {this.state.links.map((obj)=>
                            <NavUnit linkProp={obj.link} titleProp={obj.title} key={obj.title}/>
                        )}
                        <Btn class='btn btn-light btn-sm' style={this.state.logoutBtn.style} text='Logout' event={() => {this.Auth.logout();window.location = 'login'}}/>
                    </ul>
                </div>
            </nav>
        );
    }
}

class NavUnit extends Component{
    render(){
        return(
            <li className="nav-item">
                <a className="nav-link" href={this.props.linkProp}>{this.props.titleProp}</a>
            </li>
        );
    }
}
