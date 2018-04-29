import React, {Component} from 'react';

import {AssignmentList} from '../components/AssignmentsList.component.react';

import AuthService from '../AuthService';
import store from '../stores/ExactCourse.store';
import * as Actions from '../actions';

export class ExactCoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {},
            course: "",
            crn: ""
        }
        this.Auth = new AuthService();
    }
    componentWillMount(){
        try{
            if(this.Auth.loggedIn()){
                this.setState({user:this.Auth.getInfo().user}, ()=> {
                    fetch(`/student/login_id/${this.state.user.id}`).then(x => x.json()).then(payload => {
                        let courses = payload.courses;
                        let found = false;
                        for(let i = 0; i < courses.length; i++){
                            if(courses[i].id === this.state.id){
                                found = true;
                                fetch(`/course/${courses[i].id}`).then(x => x.json()).then(payload => {
                                    this.setState({course: payload.title, crn: payload.crn});
                                }).catch(err => {});
                            }
                        }
                        if(!found){
                            window.location = 'course';
                        }else{
                            store.on("change", ()=> {
                                this.setState(store.getAll());
                            });
                            Actions.start("EXACT_COURSE", {id:this.props.match.params.id, user:this.state.user});
                        }
                    }).catch(err => {
                        console.log(err.message);
                    });
                });
            }else{
                window.location = 'login';
            }
        }catch(err){
            console.log(err.message);
            window.location = 'login';
        }
    }
    render(){
        return(
            <div className="content-area text-center">
                <h1 className="heading">{this.state.course} - {this.state.crn}</h1>
                {console.log(this.state.assignments)}
                <AssignmentList assignments={this.state.assignments}/>
            </div>
        );
    }
}