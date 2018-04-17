import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';

import {Input} from '../components/input.component.react';
import {Btn} from '../components/Btn.component.react';

import * as actions from '../actions';
import {createCourseStore} from '../stores/CreateCourse.store';

export class CreateCourseContainer extends Component {
    constructor(props){
        super(props);
        this.state = createCourseStore.getAll();
    }

    componentWillMount(){
        createCourseStore.on('change', ()=>{
            this.setState(createCourseStore.getAll());
        });
    }

    validate(event){
        actions.submit("CREATE_COURSE");
        event.preventDefault();
    }

    change(event){
        actions.change("CREATE_COURSE", event.target.id, event.target.value);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.validate}>
                    <fieldset>
                        <legend>{this.props.title}</legend>
                        {this.state.form.elements.map(element =>
                            <Input key={element.id} type={element.type} id={element.id} name={element.name} text={element.text} event={this.change}/>
                        )}
                        <Btn type='submit' text='Create Course'/>
                    </fieldset>
                </form>
                <span>{this.state.feedback}</span>
            </div>
        );
    }
}

CreateCourseContainer.defaultProps = {
    title:'Title Goes Here'
}

CreateCourseContainer.propTypes = {
    title:PropTypes.string.isRequired
}