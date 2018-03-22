import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

/* dumb component, no logic should be implemented here */

export class AccountInfoBox extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div id="fnameLabel">
                    First Name:
                </div>
                <div id="fname">
                    {this.props.user.fname}
                </div>
                <div id="lnameLabel">
                    Last Name:
                </div>
                <div id="lname">
                    {this.props.user.lname}
                </div>
                <div id="emailLabel">
                    Email:
                </div>
                <div id="email">
                    {this.props.user.email}
                </div>
                <div id="classificationLabel">
                    Classification:
                </div>
                <div id="classification">
                    {this.props.user.classification}
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