import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {AssignmentPage} from './components/Assignment';
import {HomePage} from './components/Home';
import {LoginPage} from './components/Login';
import {RegisterPage} from './components/Register';
import {AccountPage} from './pages/Account.page.react';

const Root = () => {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/assignment" component={AssignmentPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/account" component={AccountPage} />
        </div>
      </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
