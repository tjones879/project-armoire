import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';

import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';

export class CreateCourseContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            form:{
                elements:[
                    {
                        type:'text',
                        id:'cName',
                        name:'courseName',
                        text:'Course Name'
                    },
                    {
                        type:'text',
                        id:'cNum',
                        name:'courseNumber',
                        text:'Course Number'
                    }
                ]
            }
        }

        this.validate = this.validate.bind(this);
    }

    validate(event){
        
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.validate}>
                <fieldset>
                    <legend>{this.props.title}</legend>
                    {this.state.form.elements.map(element =>
                        <Input key={element.id} type={element.type} id={element.id} name={element.name} text={element.text} />
                    )}
                    <Btn type='submit' text='Create Course'/>
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