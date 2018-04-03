import React, { Component } from 'react';
import {Navbar} from './Navbar'

export class HomePage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <Home />
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div className="text-center">
                <h1>Welcome to Project Armoire</h1>
                <a href="https://github.com/tjones879/project-armoire" target="_blank" rel="noopener noreferrer">GitHub Link</a><br/>
                <a href="https://trello.com/b/aYuzLHk3/project-armoire" target="_blank" rel="noopener noreferrer">Trello Board</a><br />
                <a href="https://github.com/tjones879/project-armoire/wiki/API" target="_blank" rel="noopener noreferrer">API</a>
            </div>
        );
    }
}
