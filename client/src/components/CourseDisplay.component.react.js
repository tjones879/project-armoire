import React, {Component} from 'react';

export class CourseDisplay extends Component{
    render(){
        return(
            <div>
                <div className="row">
                        <div className="col">
                            <b>Course Title</b>
                        </div>
                        <div className="col">
                            <p align="center"><b>Course Number</b></p>
                        </div>
                        <div className="col">
                            <p align="right"><b>Number of Assignments</b></p>
                        </div>
                    </div>
                {this.props.courses.map(course => 
                <div className="listbox">
                    <a className="row" key={course.crn} href={`courses/${course._id}`}>
                        <div className="col">
                            {course.title}
                        </div>
                        <div className="col">
                        <p align="center">{course.crn}</p>
                        </div>
                        <div className="col">
                            <p align="right">{course.assignments.length}</p>
                        </div>
                    </a>
                    </div>
                )}
            </div>
        );
    }
}