import React, {Component} from 'react';

export class CourseDisplay extends Component{
    render(){
        return(
            <div>
                <div className="row">
                        <div className="col">
                            Course Title
                        </div>
                        <div className="col">
                            Course Number
                        </div>
                        <div className="col">
                            Number of Assignments
                        </div>
                    </div>
                {this.props.courses.map(course => 
                    <a className="row" key={course.crn} href={`courses/${course._id}`}>
                        <div className="col">
                            {course.title}
                        </div>
                        <div className="col">
                            {course.crn}
                        </div>
                        <div className="col">
                            {course.assignments.length}
                        </div>
                    </a>
                )}
            </div>
        );
    }
}