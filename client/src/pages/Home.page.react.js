import React, { Component } from 'react';

export class HomePage extends Component{
    render(){
        return(
            <div className="container-fluid">
                <Home />
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div className="content-area text-center">
                <h1 className="heading">Welcome to Project Armoire</h1>
                <div className="tbl-container text-center">
                    <div className="row tbl-header"><div className="col">Links</div></div>
                    <a className="row tbl-row" href="https://github.com/tjones879/project-armoire" target="_blank" rel="noopener noreferrer"><div className="col">GitHub</div></a>
                    <a className="row tbl-row" href="https://trello.com/b/aYuzLHk3/project-armoire" target="_blank" rel="noopener noreferrer"><div className="col">Trello Board</div></a>
                    <a className="row tbl-row" href="https://github.com/tjones879/project-armoire/wiki/API" target="_blank" rel="noopener noreferrer"><div className="col">API</div></a>
                    <a className="row tbl-row" href="https://github.com/tjones879/project-armoire/wiki/API---Student" target="_blank" rel="noopener noreferrer"><div className="col">Student Endpoint API</div></a>
                </div>
            </div>
        );
    }
}
