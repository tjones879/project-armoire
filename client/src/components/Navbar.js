import React, {Component} from 'react'
import AuthService from '../components/AuthService';
import {Btn} from '../components/Btn.component.react';

export class Navbar extends Component{
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.links = [{
            title:"Login",
            link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/login`
        },
        {
            title:"Register",
            link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/register`
        }]
        this.state = {
            logoutBtn: {
                style: {
                    'display':'none'
                }
            }
        }
    }
    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.setState({logoutBtn:{
                style: {
                    'display': 'inline-block'
                }
            }});
            this.links.pop({title:'Register'});
            this.links.pop({title:'Login'});
            this.links.push({
                title:'Account',
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/account`
            });
            this.links.push({
                title:'Courses',
                link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/course`
            });
            const userInfo = this.Auth.getInfo();
            if(userInfo.user.classification === 'student'){
                this.links.push({
                    title:'Grades',
                    link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/grade`
                });
            }else if(userInfo.user.classification === 'professor'){
                this.links.push({
                    title:'Gradebook',
                    link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/gradebook`
                });
                this.links.push({
                    title:'Students',
                    link:`${window.location.href.split("/")[0]}//${window.location.hostname}:${window.location.port}/student`
                });
            }
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
                        {this.links.map((obj)=>
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
