import React, { Component } from 'react';
import {DescriptionBox} from './DescriptionBox';
import AuthService from './AuthService';

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
    const state = this.props.result === this.props.expected ?
      'PASS' : 'FAIL';

    return (
      <tr className="pa-tb-row">
        <td>{this.props.action}</td>
        <td>{this.props.expected}</td>
        <td>{this.props.result}</td>
        <td>{state}</td>
      </tr>
    );
  }
}

class TestResults extends Component {
  render() {
    let tests = this.props.tests.map(test => {
        test.result = null;
        return test;
    });
    tests.sort();
    if (this.props.results)
      this.props.results.forEach(result => tests[result.id].result = result.output);


    return (
      <table className="mx-auto table text-center">
        <thead>
          <tr className="pa-thead-row">
            <th scope="col">Action (test)</th>
            <th scope="col">Expected result</th>
            <th scope="col">Actual result</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test =>
            <TestResultRow key={test.id} action={test.action} expected={test.expected} result={test.result} />
          )}
        </tbody>
      </table>
    );
  }
}

class SubmissionForm extends Component {
  constructor(props) {
    super(props);

    let contents = 'Please enter your text here.';
    if (this.props.contents)
      contents = this.prop.contents;

    this.state = {
      value: contents
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
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
    });
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
  constructor(props) {
    super(props);
    this.state = {
        prevSub: {}
    };
  }

  render() {
      return (
        <div>
          <SubmissionForm contents={this.state.prevSub.contents} />
          <TestResults tests={this.props.tests} results={this.state.prevSub.tests} />
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
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if(!this.Auth.loggedIn()){
      window.location = "http://localhost:3000/login";
    }else{
      fetch('/assignment/')
        .then(res => res.json())
        .then(data => this.setState({assignment: data}));
    }
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
        <Assignment />
      </div>
    );
  }
}
