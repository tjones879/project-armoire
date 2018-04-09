import React, {Component} from 'react';

import * as Actions from '../actions/actions';
import store from '../stores/AssignmentSubmission.store.js';

import {Btn} from '../components/Btn.component.react';

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
    change(event){
        Actions.change("ASSIGNMENT_SUBMISSION", event.target.id, event.target.value);
    }
    submit(event){
        Actions.submit("ASSIGNMENT_SUBMISSION");
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <fieldset>
                        <div className="row text-center">
                            <legend className="col text-center">{this.state.assignment.title}</legend>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                Open Date
                            </div>
                            <div className="col">
                                Close Date
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.assignment.open_date}
                            </div>
                            <div className="col">
                                {this.state.assignment.close_date}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <strong>Description</strong>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.assignment.description}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <strong>Requirements</strong>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.assignment.requirements}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <strong>Examples</strong>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col text-center">
                                <strong>Input</strong>
                            </div>
                            <div className="col text-center">
                                <strong>Output</strong>
                            </div>
                        </div>
                        {this.state.examples}
                        <div className="row text-center">
                            <div className="col">
                                <textarea id="contents" name="contents" cols="80" rows="10" onChange={this.change}></textarea>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Btn type="submit" id="submit" text="Submit Submission"/>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}