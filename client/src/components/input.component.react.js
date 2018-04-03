import React from 'react';
import {Component} from 'react';

import {PropTypes} from 'prop-types';

export class Input extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='row'>
                <div className='col text-right'>
                    <label htmlFor={this.props.id}>{this.props.text}:</label>
                </div>
                <div className='col text-left'>
                    <input id={this.props.id} type={this.props.type} disabled={this.props.disabled} name={this.props.name} onChange={this.props.event}/>
                </div>
            </div>
        );
    }
}

Input.defaultProps = {
    type: 'text',
    disabled: false,
    text: 'text prop needed'
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    event: PropTypes.func
}