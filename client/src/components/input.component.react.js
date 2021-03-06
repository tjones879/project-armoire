import React from 'react';
import {Component} from 'react';

import {PropTypes} from 'prop-types';

export class Input extends Component{
    render(){
        return(
            <div className='row'>
                <div className='col text-center'>
                    <input className="default-input" placeholder={this.props.text} id={this.props.id} type={this.props.type} disabled={this.props.disabled} name={this.props.name} onChange={this.props.event} value={this.props.value} required={this.props.required}/>
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