import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import dummyReducer from './reducers/dummyReducer';
import targetsReducer from './reducers/targetsReducer';
import courseReducer from './reducers/courseReducer';
import coursesReducer from './reducers/coursesReducer';
import { actionTypes } from './constants/';
import { getPosition } from './utils/';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

const getAnimals = [
    { id: 1, name: 'Lev', group: 1, image: 'lev.jpg' },
    { id: 6, name: 'Puma', group: 1, image: 'puma.jpg' },
    { id: 2, name: 'Liska', group: 2, image: 'liska.jpg' },
    { id: 3, name: 'Sova', group: 3, image: 'sova.jpg' },
    { id: 4, name: 'Klokan', group: 4, image: 'klokan.jpg' },
    { id: 5, name: 'Srna', group: 1, image: 'srna.jpg' },
];

const initialState = {
    courses : [
        {id: 3, targets: 5, name: 'Žleby 2018'},
        {id: 4, targets: 3, name: 'Sedmihorky 2018'},
        {id: 5, targets: 5, name: 'Adršpach 2018'},
    ],
    course: {
        name: 'Žleby 2018',
        targets: 5,
        id: 3,
        selectedTarget: 4,
        selectedGroup: 4,
        selectedAnimal: 4,
        coords: {
            lat: 50.2045372,
            lng: 15.8264913,
        },
        zoom: 17,
    },
    targets: [
        { id: 1, number: 1, animalId: 1, courseId:3, group: 1, coords: null },
        { id: 2, number: 2, animalId: 2, courseId:3, group: 2, coords: null },
        { id: 3, number: 3, animalId: 3, courseId:3, group: 3, coords: null },
        { id: 4, number: 4, animalId: 4, courseId:3, group: 4, coords: null },
        { id: 5, number: 5, animalId: 5, courseId:3, group: 1, coords: null },
        { id: 6, number: 6, animalId: 6, courseId:3, group: 1, coords: null },
        { id: 7, number: 7, animalId: 7, courseId:3, group: 1, coords: null },
        { id: 8, number: 8, animalId: 8, courseId:3, group: 1, coords: null },
        // { id: 9, number: 9, animalId: 9, group: 1, coords: null },
        // { id: 10, number: 10, animalId: 10, group: 1, coords: null },
        // { id: 11, number: 11, animalId: 11, group: 1, coords: null },
        // { id: 12, number: 12, animalId: 12, group: 1, coords: null },
    ],
    animals: getAnimals
};
const devext = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f;
const store = createStore(combineReducers({
    courses: coursesReducer,
    targets: targetsReducer,
    course: courseReducer,
    animals: dummyReducer,
    routing: routerReducer,
}), initialState, compose(devext, applyMiddleware(reduxRouterMiddleware)));

const locationDispatch = store => () => {
    Promise.resolve(getPosition())
        .then(position => {
            const { coords } = position;
            store.dispatch({
                type: actionTypes.LOCATION_UPDATE,
                payload: { coords: { lat: coords.latitude, lng: coords.longitude } }
            });
        });
};
locationDispatch(store)();
//setInterval(locationDispatch(store), 5000);

export default store;
