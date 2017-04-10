import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import courseReducer from './reducers/courseReducer';
import animalsReducer from './reducers/animalsReducer';
import targetsReducer from './reducers/targetsReducer';
import planReducer from './reducers/planReducer';

const logger = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory);

const getAnimals =  [
    { id: 1, name: 'Lev', group: 1, image: 'lev.jpg' },
    { id: 2, name: 'Liska', group: 2, image: 'liska.jpg' },
    { id: 3, name: 'Sova', group: 3, image: 'sova.jpg' },
    { id: 4, name: 'Klokan', group: 4, image: 'klokan.jpg' },
    { id: 5, name: 'Srna', group: 1, image: 'srna.jpg' },
];

const initialState = {
    course: {
        name: 'Zleby 2018',
        targets: 5,
    },
    plan: {
        selectedTarget: 4,
        selectedGroup: 4,
        selectedAnimal: 4,
    },
    targets: [
        { id: 1, number: 1, animalId: 1, group: 1, lat: null, lng: null },
        { id: 2, number: 2, animalId: 2, group: 2, lat: null, lng: null },
        { id: 3, number: 3, animalId: 3, group: 3, lat: null, lng: null },
        { id: 4, number: 4, animalId: 4, group: 4, lat: null, lng: null },
        { id: 5, number: 5, animalId: 5, group: 1, lat: null, lng: null },
    ],
    animals: getAnimals
};
const devext = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f;
const store = createStore(combineReducers({
    course: courseReducer,
    targets: targetsReducer,
    plan: planReducer,
    animals: animalsReducer,
    routing: routerReducer,
}), initialState, compose(devext, applyMiddleware(reduxRouterMiddleware, logger)));

export default store;
