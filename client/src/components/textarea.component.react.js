import React from 'react';
import {Component} from 'react';

import {PropTypes} from 'prop-types';

export class TextArea extends Component{
    render(){
        return(
            <div className='row'>
                <div className='col text-center'>
                    <textarea className="txt-box" id={this.props.id} type={this.props.type} disabled={this.props.disabled} name={this.props.name} onChange={this.props.event} value={this.props.value}/>
                </div>
            </div>
        );
    }
}

TextArea.defaultProps = {
    type: 'text',
    disabled: false
}

TextArea.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    event: PropTypes.func
}