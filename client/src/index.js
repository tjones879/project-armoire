import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Assignment from './components/Assignment.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

const Root = () => {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/assignment" component={Assignment} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
