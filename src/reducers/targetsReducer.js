import updeep from 'updeep';
import { actionTypes } from '../constants/';

const targetsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TARGET:
            const { target, field, value } = action.payload;
            return updeep.map(t => {
                if (t.id === target.id) {
                    return updeep.updateIn(field, value, target);
                } else {
                    return t;
                }
            }, state);
        default:
            return state;
    }
};

export default targetsReducer;
