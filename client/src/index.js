import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Switch} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import {Navbar} from './containers/Navbar.container.react';
import {HomePage} from './pages/Home.page.react';
import {LoginPage} from './pages/Login.page.react';
import {RegisterPage} from './pages/Register.page.react';
import {AccountPage} from './pages/Account.page.react';
import {CoursePage} from './pages/Courses.page.react';
import {CreateCoursePage} from './pages/CreateCourse.page.react';
import {CreateAssignmentPage} from './pages/CreateAssignment.page.react';
import {StudentPage} from './pages/Student.page.react';
import {GradebookPage} from './pages/Gradebook.page.react';
import {AccountChangePage} from './pages/AccountChange.page.react';
import {SearchStudentsPage} from './pages/SearchStudents.page.react';
import {ExactCoursePage} from './pages/ExactCourse.page.react';
import {ExactAssignmentPage} from './pages/Assignment.page.react';



const Root = () => {
    return (
      <Router>
        <div className="container-fluid">
        <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Switch>
            <Route exact path="/account" component={AccountPage} />
            <Route path='/account/change' component={AccountChangePage} />
          </Switch>
          <Switch>
            <Route path='/courses/:id' component={ExactCoursePage} />
            <Route exact path='/courses' component={CoursePage} />
          </Switch>
          <Switch>
              <Route path='/assignments/:id' component={ExactAssignmentPage}/>
          </Switch>
          <Switch>
            <Route path='/create/course' component={CreateCoursePage} />
            <Route path='/create/assignment' component={CreateAssignmentPage} />
          </Switch>
          <Route path='/gradebook' component={GradebookPage} />
          <Switch>
            <Route exact path='/student' component={StudentPage} />
            <Route path='/student/search' component={SearchStudentsPage} />
          </Switch>
        </div>
      </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
