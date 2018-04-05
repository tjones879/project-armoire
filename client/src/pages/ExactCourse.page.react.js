import React, {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {AssignmentList} from '../components/AssignmentsList.component.react';

import AuthService from '../components/AuthService';
import store from '../stores/ExactCourse.store';
import * as Actions from '../actions/actions';

export class ExactCoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
        this.Auth = new AuthService();
    }
    componentWillMount(){
        try{
            if(this.Auth.loggedIn()){
                this.setState({user:this.Auth.getInfo().user}, ()=> {
                    fetch(`../student/login_id/${this.state.user.id}`).then(x => x.json()).then(payload => {
                        let courses = payload.courses;
                        let found = false;
                        for(let i = 0; i < courses.length; i++){
                            if(courses[i].id === this.state.id){
                                found = true;
                            }
                        }
                        if(!found){
                            window.location = '../course';
                        }else{
                            store.on("change", ()=> {
                                this.setState(store.getAll());
                            });
                            Actions.courseInit(this.props.match.params.id, this.state.user);
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
            <div>
                <Navbar />
                {console.log(this.state.assignments)}
                <AssignmentList assignments={this.state.assignments}/>
            </div>
        );
    }
}