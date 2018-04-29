import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export class AssignmentList extends Component{
    render(){
        return(
            <div className="tbl-container">
                <div className="row tbl-header">
                    <div className="col">
                        Title
                    </div>
                    <div className="col">
                        Open Date
                    </div>
                    <div className="col">
                        Close Date
                    </div>
                    <div className="col">
                        Description
                    </div>
                </div>
                {this.props.assignments.map(assignment => 
                    <a key={assignment._id} className="row tbl-row" href={`/assignments/${assignment._id}`}>
                        <div className="col">
                            {assignment.title}
                        </div>
                        <div className="col">
                            {assignment.open_date}
                        </div>
                        <div className="col">
                            {assignment.close_date}
                        </div>
                        <div className="col">
                            {assignment.description}
                        </div>
                    </a>
                )}
            </div>
        );
    }
}

AssignmentList.defaultProps = {
    assignments: [
        {
            _id: "5ac326d7bdd6be560ceeeed0",
            title:"title",
            open_date:"open_date",
            close_date:"close_date",
            description:"description",
            requirements:"requirements"
        }
    ]
}

AssignmentList.propTyps = {
    assignments: PropTypes.array.isRequired
}