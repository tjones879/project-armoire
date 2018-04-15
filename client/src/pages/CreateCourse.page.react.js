import React from 'react';
import {Component} from 'react';

import {CreateCourseContainer} from '../containers/CreateCourse.container.react';

export class CreateCoursePage extends Component{
    render(){
        return(
            <div>
                <div className='row'>
                    <div className='col text-center'>
                        <CreateCourseContainer title='Create New Course' />
                    </div>
                </div>
            </div>
        );
    }
}