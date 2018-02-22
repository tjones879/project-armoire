import React, { Component } from 'react';

export default class DescriptionBox extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.type}</h4>
        <p>{this.props.contents}</p>
      </div>
    );
  }
}
