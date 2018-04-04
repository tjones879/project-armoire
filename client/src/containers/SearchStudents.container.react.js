import React, {Component} from 'react';

import * as Actions from '../actions/actions';
import store from '../stores/SearchStudents.store';

import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';
import {SelectBox} from '../components/SelectBox.component.react';

export class SearchStudentsContainer extends Component{
    constructor(props){
        super(props);
        this.state = store.getAll();
    }
    componentWillMount(){
        store.on("change", () => {
            this.setState(store.getAll());
        });
    }
    submit(event){
        Actions.submit("SEARCH_STUDENT");
        event.preventDefault();
    }
    change(event){
        Actions.change("SEARCH_STUDENT",event.target.id,event.target.value);
    }
    addStudent(event){
        Actions.addStudentToCourse(event.target.id);
        event.preventDefault();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <fieldset>
                        <legend>{this.props.title}</legend>
                        {this.state.elements.input.map(x => <Input type={x.type} text={x.text} id={x.id} key={x.id} name={x.name} event={this.change}/>)}
                        <div className="row text-center">
                            <div className="col">
                                <Btn type="submit" text="Search"/>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {this.state.feedback}
                            </div>
                        </div>
                    </fieldset>
                </form>
                <StudentResults students={this.state.students} options={this.state.options} event={this.addStudent} changeEvent={this.change}/>
            </div>
        );
    }
}

class StudentResults extends Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col">
                        First Name
                    </div>
                    <div className="col">
                        Last Name
                    </div>
                    <div className="col">
                        ID
                    </div>
                    <div className="col">
                        Actions
                    </div>
                </div>
                {this.props.students.map(student => 
                    <div className="row" key={student._id}>
                        <div className="col">
                            {student.fname}
                        </div>
                        <div className="col">
                            {student.lname}
                        </div>
                        <div className="col">
                            {student._id}
                        </div>
                        <div className="col">
                            <form onSubmit={this.props.event} id={student._id}>
                                <SelectBox options={this.props.options} id={`courseSelect${student._id}`} event={this.props.changeEvent} title="Add to Course"/>
                                <Btn text="Add" type="submit"/>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}