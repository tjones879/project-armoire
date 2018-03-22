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
            <div className="text-center">
                <div id="fnameRow" className="row">
                    <div id="fnameLabel" className="col">
                        First Name:
                    </div>
                    <div id="fname" className="col">
                        {this.props.user.fname}
                    </div>
                </div>
                <div id="lnameRow" className="row">
                    <div id="lnameLabel" className="col">
                        Last Name:
                    </div>
                    <div id="lname" className="col">
                        {this.props.user.lname}
                    </div>
                </div>
                <div id="emailRow" className="row">
                    <div id="emailLabel" className="col">
                        Email:
                    </div>
                    <div id="email" className="col">
                        {this.props.user.email}
                    </div>
                </div>
                <div id="classificationRow" className="row">
                    <div id="classificationLabel" className="col">
                        Classification:
                    </div>
                    <div id="classification" className="col">
                        {this.props.user.classification}
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