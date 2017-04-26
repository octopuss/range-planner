// IMPORTANT! babel-polyfill must be imported before anything else
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { App } from './components';
import store from './store';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

render(
    <div>
        <Provider store={store} >
            <App history={history} />
        </Provider>
    </div>, document.getElementById('app')
);
