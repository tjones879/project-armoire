import React, {Component} from 'react';

import * as Actions from '../actions';
import store from '../stores/AssignmentSubmission.store.js';

import {Btn} from '../components/Btn.component.react';

import {CodeArea} from '../components/codearea.component.react';

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
                <div className="title-block text-center"><h1 className="heading">{this.state.assignment.title}</h1></div>
                <form onSubmit={this.submit}>
                    <fieldset>
                        <div className="row text-center">
                            <div className="col">
                                <div className="section">
                                    <div>
                                        Open Date
                                    </div>
                                    <div>
                                        {this.state.assignment.open_date}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="section">
                                    <div>
                                        Close Date
                                    </div>
                                    <div>
                                        {this.state.assignment.close_date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <div className="outlined-sunk">
                                    <div>
                                        <strong>Description</strong>
                                    </div>
                                    <div>
                                        {this.state.assignment.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <div className="outlined-sunk">
                                    <div>
                                        <strong>Requirements</strong>
                                    </div>
                                    <div>
                                        {this.state.assignment.requirements}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <div className="outlined-sunk">
                                    <strong>Examples</strong>
                                    <div className="row text-center">
                                        <div className="col text-center outlined-sunk-grn">
                                            <strong>Input</strong>
                                        </div>
                                        <div className="col text-center outlined-sunk-grn">
                                            <strong>Output</strong>
                                        </div>
                                    </div>
                                    {this.state.examples}
                                </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <CodeArea id="contents" name="contents" onChange={this.change}></CodeArea>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <h2>Standard Input</h2>
                                <textarea id="stdin" className="textarea" name="stdin" cols="80" rows="10" onChange={this.change}></textarea>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.feedback}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Btn type="submit" class="button" id="submit" text="Submit Submission"/>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
