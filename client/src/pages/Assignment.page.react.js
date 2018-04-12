import React, {Component} from 'react';

import {AssignmentSubmission} from '../containers/AssignmentSubmission.container.react';

import AuthService from '../components/AuthService';

export class ExactAssignmentPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
        }
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn()){

        }else{
            window.location = '../login';
        }
    }
    render(){
        return(
            <div>
                <AssignmentSubmission user={this.Auth.getInfo().user} id={this.state.id}/>
            </div>
        );
    }
}