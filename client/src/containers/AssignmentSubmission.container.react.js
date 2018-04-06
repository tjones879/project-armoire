import React, {Component} from 'react';

import * as Actions from '../actions/actions';
import store from '../stores/AssignmentSubmission.store.js';

export class AssignmentSubmission extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        store.on("change", ()=>{
            this.setState(store.getAll());
        });
        Actions.start("ASSIGNMENT_SUBMISSION", {id:this.props.id, user:this.props.user});
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}