import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Switch} from 'react-router';
import "./index.css";
import registerServiceWorker from './registerServiceWorker';
import {AssignmentPage} from './components/Assignment';
import {HomePage} from './components/Home';
import {LoginPage} from './components/Login';
import {RegisterPage} from './components/Register';
import {AccountPage} from './pages/Account.page.react';
import {CoursePage} from './pages/Courses.page.react';
import {CreateCoursePage} from './pages/CreateCourse.page.react';
import {CreateAssignmentPage} from './pages/CreateAssignment.page.react';
import {StudentPage} from './pages/Student.page.react';
import {GradebookPage} from './pages/Gradebook.page.react';
import {AccountChangePage} from './pages/AccountChange.page.react';
import {SearchStudentsPage} from './pages/SearchStudents.page.react';
import {ExactCoursePage} from './pages/ExactCourse.page.react';



const Root = () => {
    return (
      <Router>
        <div className="container-fluid">
          <Route exact path="/" component={HomePage} />
          <Route path="/assignment" component={AssignmentPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/account" component={AccountPage} />
          <Switch>
            <Route exact path='/course/:id' component={ExactCoursePage} />
            <Route path='/course' component={CoursePage} />
          </Switch>
          <Route path='/createcourse' component={CreateCoursePage} />
          <Route path='/createassignment' component={CreateAssignmentPage} />
          <Route path='/student' component={StudentPage} />
          <Route path='/gradebook' component={GradebookPage} />
          <Route path='/account_change' component={AccountChangePage} />
          <Route path='/search_students' component={SearchStudentsPage} />
        </div>
      </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
