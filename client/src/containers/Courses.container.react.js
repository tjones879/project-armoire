import React, {Component} from 'react';
import {CourseDisplay} from '../components/CourseDisplay.component.react';
import store from '../stores/Courses.store';
import * as Actions from '../actions';

export class Courses extends Component{
    constructor(props){
        super(props);
        this.state = store.getAll();
    }
    componentWillMount(){
        store.on("change", ()=>{
            this.setState(store.getAll());
        });
        Actions.start("COURSES", this.props.courses);
    }
    componentWillReceiveProps(props) {
        Actions.start("COURSES", props.courses);
    }
    render(){
        return(
            <div>
                <CourseDisplay courses={this.state.coursesInfo}/>
            </div>
        );
    }
}