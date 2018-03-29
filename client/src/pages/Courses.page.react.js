import React from 'react';
import {Component} from 'react';

import {Navbar} from '../components/Navbar';
import {Btn} from '../components/Btn.component.react';

export class CoursePage extends Component{
    render(){
        return(
            <div>
                <Navbar />
                <Btn text='Create New Course' class='btn btn-light' event={()=>{window.location = "course/create"}}/>
            </div>
        );
    }
}