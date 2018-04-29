import React from 'react';
import {Component} from 'react';
import AceEditor from 'react-ace';

import {PropTypes} from 'prop-types';
import 'brace/mode/python';
import 'brace/theme/monokai';

export class CodeArea extends Component{

    render(){
        return(
            <div className='row'>
                <div className='col text-right'>
                    <label htmlFor={this.props.id}>{this.props.text}:</label>
                </div>
                <div className='col text-left'>
                    <AceEditor id={this.props.id} name={this.props.name} value={this.props.value} theme="monokai" mode="python" onChange={this.props.event} editorProps={{
                        $blockScrolling: true
                    }}
                    setOptions={{
                        enableLiveAutocompletion: true
                    }}/>
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
    // mode: PropTypes.string.isRequired,
    // theme: PropTypes.string.isRequired
}