import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/';

const updatePosition = createAction(actionTypes.LOCATION_UPDATE, (coords) => ({coords}));
export { updatePosition };
