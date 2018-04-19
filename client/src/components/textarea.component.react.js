import React from 'react';
import {Component} from 'react';

import {PropTypes} from 'prop-types';

export class TextArea extends Component{
    render(){
        return(
            <div className='row'>
                <div className='col text-right'>
                    <label htmlFor={this.props.id}>{this.props.text}:</label>
                </div>
                <div className='col text-left'>
                    <textarea id={this.props.id} type={this.props.type} disabled={this.props.disabled} name={this.props.name} onChange={this.props.event} value={this.props.value}/>
                </div>
            </div>
        );
    }
}

TextArea.defaultProps = {
    type: 'text',
    disabled: false,
    text: 'text prop needed'
}

TextArea.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    event: PropTypes.func
}