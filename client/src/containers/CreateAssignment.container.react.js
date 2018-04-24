import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SelectBox} from '../components/SelectBox.component.react';
import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';
import {Examples} from '../components/Examples.component.react';
import {Tests} from '../components/Tests.component.react';

import * as actions from '../actions';
import store from '../stores/CreateAssignment.store';

export class CreateAssignment extends Component{
    constructor(props){
        super(props);

        this.state = store.getAll();
        this.change = this.change.bind(this);
    }
    componentWillMount(){
        store.on("change", ()=>{this.setState(store.getAll())});
        actions.start("CREATE_ASSIGNMENT",this.props.user);
    }
    validate(event){
        actions.submit("CREATE_ASSIGNMENT");
        event.preventDefault();
    }
    addTest(){
        actions.add("CREATE_ASSIGNMENT", "TEST");
    }
    addExample(){
        actions.add("CREATE_ASSIGNMENT", "EXAMPLE");
    }
    change(event){
        actions.change("CREATE_ASSIGNMENT",event.target.id, event.target.value);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.validate}>
                    <fieldset>
                        <div className="row">
                            <div className="col">
                                <legend className="text-center heading">{this.props.title}</legend>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <SelectBox event={this.change} options={this.state.options} title="Course" id="CourseSelectBox"/>
                            </div>
                            <div className="col text-center">
                                <SelectBox event={this.change} options={[{text:"C++",value:"c++"},{text:"Java",value:"java"},{text:"Python 3",value:"python3"},{text:"Python 2",value:"python2"}]} title="Language" id="LanguageSelectBox"/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <input onChange={this.change} className="default-input" type="text" id="aTitle" name="aTitle" placeholder="Assignment Title" autoFocus style={{marginTop:"30px"}}/>
                            </div>
                        </div>
                        <div className="date-box text-center">
                            <span className="heading">Dates</span>
                            <div className="row text-center">
                                <div className="col sub-date">
                                    <div>Open</div>
                                    <input onChange={this.change} className="default-input" type="date" id="aOpen" name="aOpen" placeholder="Open Date"/>
                                </div>
                                <div className="col sub-date">
                                    <div>Close</div>
                                    <input onChange={this.change} className="default-input" type="date" id="aClose" name="aClose" placeholder="Close Date"/>
                                </div>
                            </div>
                        </div>
                        <Examples event={this.change} elements={this.state.examples}/>
                        <div className="row text-center">
                            <div className="col">
                                <Btn text="Add Example" id="addE" type="button" event={this.addExample}/>
                            </div>
                        </div>
                        <Tests event={this.change} elements={this.state.tests}/>
                        <div className="row text-center">
                            <div className="col">
                                <Btn text="Add Test" id="addT" type="button" event={this.addTest}/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <span id="loading">{this.state.loading}</span>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <Btn text="Submit" id="submit" type="submit"/>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="row text-center">
                    <div className="col feedback">
                        {this.state.feedback}
                    </div>
                </div>
            </div>
        );
    }
}

CreateAssignment.defaultProps = {
    user: {
        id: "5ab32ee7f0f2a02efc9a3140",
        email: "email@somesite.com",
        classification: "professor"
    }
}

CreateAssignment.propTypes = {
    user: PropTypes.object.isRequired
}