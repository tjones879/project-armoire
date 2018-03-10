import React, { Component } from 'react';
import {Navbar} from './Navbar'
import {DescriptionBox} from './DescriptionBox';

class ExampleIORow extends Component {
    render() {
        return (
         <li className="row">
            <div className="col text-center">{this.props.input}</div>
            <div className="col text-center">=== Yields ==></div>
            <div className="col text-center">{this.props.output}</div>
         </li>
        );
    }
}

class ExampleIO extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.examples.map((example) => <ExampleIORow input={example.input} output={example.output} />)}
        </ul>
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
      <tr className="pa-tb-row">
        <td>{state}</td>
        <td>{this.props.label}</td>
      </tr>
    );
  }
}

class TestResults extends Component {
  render() {
    return (
      <table className="mx-auto table text-center">
        <thead>
          <tr className="pa-thead-row">
            <th scope="col">State</th>
            <th scope="col">Condition (test)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tests.map((test)=>
            <TestResultRow state={test.success} label={test.label} key={test.label}/>
          )}
        </tbody>
      </table>
    );
  }
}

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Please enter your text here."
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(JSON.stringify(this.state.value));
    const data = JSON.stringify({
        form: this.state.value
    });
    fetch('/assignment', {
        method: 'post',
        body: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => console.log(data));
    alert('A submission was entered: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="text-center">
        <textarea  value={this.state.value} onChange={this.handleChange} rows="25" cols="85"/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Submission extends Component {
  render() {
    return (
      <div>
        <SubmissionForm />
        <hr />
        <TestResults tests={this.props.tests}/>
      </div>
    );
  }
}

class Assignment extends Component {
  constructor() {
    super();
    this.state = {
        assignment: [],
    };
  }

  componentDidMount() {
    fetch('/assignment/')
      .then(res => res.json())
      .then(data => this.setState({page: data}));
  }

  render() {
    return (
      <div>
        {this.state.assignment.map(data =>
          <div>
            <h2 className="text-center">{data.name}</h2>
            <hr />
            <DescriptionBox type="Description" contents={data.description} />
            <DescriptionBox type="Requirements" contents={data.requirements} />
            <ExampleIO examples={data.examples} />
            <hr />
            <Submission tests={data.tests} />
          </div>
        )}
      </div>
    );
  }
}

export class AssignmentPage extends Component{
  render(){
    return(
      <div className="container-fluid">
        <Navbar />
        <Assignment />
      </div>
    );
  }
}

