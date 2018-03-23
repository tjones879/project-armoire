import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

export class Btn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <button id={this.props.id} type={this.props.type} onClick={this.props.event} disabled={this.props.disabled}>{this.props.text}</button>
        );
    }
}

Btn.defaultProps = {
    text:'Button',
    id:'BtnID',
    type:'button',
    event: () => {},
    disabled: false
}

Btn.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    event: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}