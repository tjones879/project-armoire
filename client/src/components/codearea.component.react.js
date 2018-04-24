import React from 'react';
import {Component} from 'react';
// import brace from 'brace';
import AceEditor from 'react-ace';

import {PropTypes} from 'prop-types';
import 'brace/mode/python';
import 'brace/theme/twilight';

export class CodeArea extends Component{

    render(){
        return(
            <div className='row'>
                <div className='col text-right'>
                    <label htmlFor={this.props.id}>{this.props.text}:</label>
                </div>
                <div className='col text-left'>
                    <AceEditor id={this.props.id} name={this.props.name} value={this.props.value} theme="twilight" mode="python" disabled={this.props.disabled}/>
                    {/* <Textarea id={this.props.id} type={this.props.type} disabled={this.props.disabled} name={this.props.name} onChange={this.props.event} value={this.props.value}/> */}
                </div>
            </div>
        );
    }
}

CodeArea.defaultProps = {
    type: 'text',
    disabled: false,
    text: 'text prop needed'
}

CodeArea.propTypes = {
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    event: PropTypes.func
}