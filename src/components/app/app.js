import React from 'react';
import { CoursePlanner, NgView } from '../../components';
import { Router, Route, IndexRoute } from 'react-router';

import './app.scss';

const App = ({ history }) =>
<div className="App" >
    <Router history={history} >
        <Route path="/" component={CoursePlanner} />
        <Route path="/new" component={NgView} />
    </Router>
</div>;

export default App;
