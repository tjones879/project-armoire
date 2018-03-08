import React, { Component } from 'react';

export class DescriptionBox extends Component {
  render() {
    return (
      <div className="row">
        <h4 className="col text-right align-text-top">{this.props.type}</h4>
        <p className="col text-left align-text-top">{this.props.contents}</p>
      </div>
    );
  }
}
