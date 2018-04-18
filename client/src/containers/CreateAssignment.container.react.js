import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SelectBox} from '../components/SelectBox.component.react';
import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';
import {Examples} from '../components/Examples.component.react';
import {Tests} from '../components/Tests.component.react';

import * as actions from '../actions/CreateAssignment.actions';
import store from '../stores/CreateAssignment.store';

export class CreateAssignment extends Component{
    constructor(props){
        super(props);

        this.state = store.getAll();
        this.change = this.change.bind(this);
    }
    componentWillMount(){
        store.on("change", ()=>{this.setState(store.getAll())});
        actions.getInfo(this.props.user);
    }
    validate(event){
        actions.submit();
        event.preventDefault();
    }

    change(event){
        actions.change(event.target.id, event.target.value);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.validate}>
                    <fieldset>
                        <div className="row">
                            <div className="col">
                                <legend className="text-center">{this.props.title}</legend>
                            </div>
                        </div>
                        <SelectBox event={this.change} options={this.state.options} title="Course" id="CourseSelectBox"/>
                        <SelectBox event={this.change} options={[{text:"C++",value:"c++"},{text:"Java",value:"java"},{text:"Python 3",value:"python3"},{text:"Python 2",value:"python2"}]} title="Language" id="LanguageSelectBox"/>
                        {this.state.form.elements.map(element =>
                            <Input event={this.change} key={element.id} type={element.type} id={element.id} name={element.name} text={element.text}/>
                        )}
                        <Examples event={this.change} elements={this.state.examples}/>
                        <div className="row text-center">
                            <div className="col">
                                <Btn text="Add Example" id="addE" type="button" event={actions.addExample}/>
                            </div>
                        </div>
                        <Tests event={this.change} elements={this.state.tests}/>
                        <div className="row text-center">
                            <div className="col">
                                <Btn text="Add Test" id="addT" type="button" event={actions.addTest}/>
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
                    <div className="col">
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