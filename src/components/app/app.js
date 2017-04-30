import React from 'react';
import { CoursePlanner, CoursesList, CourseForm, AnimalForm, AnimalsList, ImageForm } from '../../components';
import { Router, Route } from 'react-router';

import './app.scss';

const App = ({ history }) =>
<div className="App" >
    <Router history={history} >
        <Route path="/" component={CoursesList} />
        <Route path="/new" component={CourseForm} />
        <Route path="/planner/:id" component={CoursePlanner} />
        {/*<Route path="/animals" component={AnimalsList} />*/}
        {/*<Route path="/animal" component={AnimalForm} />*/}
        {/*<Route path="/image" component={ImageForm} />*/}
    </Router>
</div>;

export default App;
