import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

/* dumb component, no logic should be implemented here */

export class AccountInfoBox extends Component{
    render(){
        return(
            <div className="content">
                <div id="fnameRow" className="row">
                    <div id="fname" className="col">
                        <h2>{this.props.user.fname} {this.props.user.lname}</h2>
                    </div>
                </div>
                <div id="emailRow" className="row">
                    <div id="email" className="col">
                        <b>{this.props.user.email}</b>
                    </div>
                </div>
                <div id="classificationRow" className="row">
                    <div id="classification" className="col">
                        <div className="cap">{this.props.user.classification}</div>
                    </div>
                </div>
            </div>
        );
    }
}

AccountInfoBox.defaultProps = {
    user: {
        fname:'Luke',
        lname:'Skywalker',
        email:'lukeskywalker@somesite.com',
        classification:'student'
    }
}

AccountInfoBox.propTypes = {
    user: PropTypes.object.isRequired
}