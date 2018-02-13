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

class ExampleIORow extends Component {
    render() {
        return (
         <li>{this.props.input}
           <ul>
             <li>{this.props.output}</li>
           </ul>
         </li>
        );
    }
}

class ExampleIO extends Component {
  render() {
    const rows = [];
      this.props.examples.forEach((example) => {
        rows.push(<ExampleIORow input={example.input} output={example.output} />);
      });
    return (
      <div>
        <ul>
          {rows}
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
    alert('A submission was entered: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange} rows="25" cols="85"/>
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
        <div>
          <TestResults tests={this.props.tests}/>
        </div>
      </div>
    );
  }
}

class Assignment extends Component {
  constructor() {
    super();
    this.state = {
        page: [],
    };
  }

  componentDidMount() {
    fetch('/assignment')
      .then(res => res.json())
      .then(data => this.setState({page: [data]}));
  }

  render() {
    return (
      <div>
        {this.state.page.map(data =>
          <div>
            <h2>{data.name}</h2>
            <hr />
            <Description type="Description" contents={data.description} />
            <Description type="Requirements" contents={data.requirements} />
            <ExampleIO examples={data.io} />
            <hr />
            <Submission tests={data.tests} />
          </div>
        )}
      </div>
    );
  }
}

export default Assignment;
