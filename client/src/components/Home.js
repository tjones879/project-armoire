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
            <h1 className="text-center">Welcome to Project Armoire</h1>
        );
    }
}
