import React, {Component} from 'react'

export class Navbar extends Component{
    constructor(props){
        super(props);
        this.links = [{
            title:"Login",
            link:"http://localhost:3000/login"
        },
        {
            title:"Register",
            link:"http://localhost:3000/register"
        }]
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg pa-navbar">
                <a className="navbar-brand" href="http://localhost:3000">Project Armoire</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {this.links.map((obj)=>
                            <NavUnit linkProp={obj.link} titleProp={obj.title}/>
                        )}
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