import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Assignment from './components/Assignment.js';

const Root = () => {
    return (
      <Router>
        <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/assignment">Assignments</Link></li>
        </ul>
          <Route path="/assignment" component={Assignment} />
        </div>
      </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
