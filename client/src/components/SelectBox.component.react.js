import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export class SelectBox extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">  
                <label htmlFor={this.props.id} className="col text-right">
                    {this.props.title}:
                </label>
                <div className="col text-left">
                    <select id={this.props.id} onChange={this.props.event}>
                        {this.props.options.map(obj =>
                            <option key={obj.value} id={obj.value} value={obj.value}>{obj.text}</option>
                        )}
                    </select>
                </div>
            </div>
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