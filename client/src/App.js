import React, { Component } from 'react';
import './App.css';

class Description extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.type}</h4>
        <p>{this.props.contents}</p>
      </div>
    );
  }
}

class ExampleIO extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class TestResultRow extends Component {
  render() {
    const state = this.props.state ?
      "PASS" :
      "FAIL";

    return (
      <tr>
        <td>{state}</td>
        <td>{this.props.label}</td>
      </tr>
    );
  }
}

class TestResults extends Component {
  render() {
    const rows = [];
    this.props.tests.forEach((test) => {
      rows.push(
        <TestResultRow state={test.success} label={test.label} key={test.label} />
      );
    });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class Submission extends Component {
  render() {
    return (
      <div>
        <TestResults tests={this.props.tests}/>
      </div>
    );
  }
}

class Assignment extends Component {
  render() {
    return (
      <div>
        <h2>{PROJECT.name}</h2>
        <hr />
        <Description type="Description" contents={PROJECT.description} />
        <Description type="Requirements" contents={PROJECT.requirements} />
        <ExampleIO examples={PROJECT.io} />
        <hr />
        <Submission tests={PROJECT.tests} />
      </div>
    );
  }
}

const PROJECT = {
  name: "Project 1",
  description: "DESCRIPTION RANDOM TEXT",
  requirements: "REQUIREMENT RANDOM TEXT",
  io: [
    {input: "EXAMPLE INPUT 1", output: "EXAMPLE OUTPUT 1" },
    {input: "EXAMPLE INPUT 2", output: "EXAMPLE OUTPUT 2" },
  ],
  tests: [
    {success: false, label: "EXAMPLE LABEL 1"},
    {success: true,  label: "EXAMPLE LABEL 2"},
  ],
}

export default Assignment;
