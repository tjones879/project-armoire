import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';

export class CreateCourseContainer extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <form>
                <fieldset>
                    <legend>{this.props.title}</legend>
                </fieldset>
            </form>
        );
    }
}

CreateCourseContainer.defaultProps = {
    title:'Title Goes Here'
}

CreateCourseContainer.propTypes = {
    title:PropTypes.string.isRequired
}