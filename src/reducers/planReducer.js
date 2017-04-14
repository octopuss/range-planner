import { actionTypes } from '../constants/';
import updeep from 'updeep';

const planReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SELECT_TARGET:
            const { selectedTarget } = action.payload;
            return updeep.update({'selectedTarget': selectedTarget.number, 'selectedGroup' : selectedTarget.group}, state);
        case actionTypes.SELECT_GROUP:
            const { group } = action.payload;
            return updeep.updateIn('selectedGroup', group, state);
        case actionTypes.LOCATION_UPDATE:
            const { coords } = action.payload;
            return updeep.update({'coords': coords}, state);
        default:
            return state;
    }
};

export default planReducer;
