import React from 'react';
import {Component} from 'react';

import {Btn} from '../components/Btn.component.react';
import {Courses} from '../containers/Courses.container.react';

import AuthService from '../components/AuthService';

export class CoursePage extends Component{
    constructor(){
        super();
        this.state = {
            components: [],
            user: {}
        }

        this.Auth = new AuthService();
    }
    componentWillMount(){
        this.setState({user: this.Auth.getInfo().user}, () => {
            if(this.state.user.classification === 'professor'){
                this.setState({components: [
                    <Btn text='Create New Course' class='btn btn-light' event={()=>{window.location = "createcourse"}}/>,
                    <Btn text='Create New Assignment' class='btn btn-light' event={()=>{window.location = 'createassignment'}} />
                ]});
            }else{
                this.setState({components: [
                    <Courses user={this.state.user}/>
                ]});
            }
        });
    }
    render(){
        return(
            <div>
                {this.state.components.map((component, index) =>
                    <div key={index}>
                        {component}
                    </div>
                )}
            </div>
        );
    }
}