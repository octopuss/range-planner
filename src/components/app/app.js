import React from 'react';
import { CoursePlanner } from '../../components';
import { Router, Route, IndexRoute } from 'react-router';

import './app.scss';

const App = ({ history }) =>
    <div className="App">
        <Router history={history}>
            <Route path="/" component={CoursePlanner}/>
        </Router>
    </div>;

export default App;
