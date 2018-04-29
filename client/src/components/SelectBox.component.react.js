import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export class SelectBox extends Component{
    render(){
        return(
            <select id={this.props.id} onChange={this.props.event}>
                <option disabled selected value>{this.props.title} (select one)</option>
                {this.props.options.map(obj =>
                    <option key={obj.value} id={obj.value} value={obj.value}>{obj.text}</option>
                )}
            </select>
        );
    }
}

SelectBox.defaultProps = {
    options: [
        {
            text: "option text",
            value: "option value"
        },
        {
            text: "option text 2",
            value: "option value 2"
        }
    ]
};

SelectBox.propTypes = {
    options: PropTypes.array.isRequired
};