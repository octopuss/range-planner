import { createAction } from 'redux-actions';
import { actionTypes } from '../constants/';

const selectTarget = createAction(actionTypes.SELECT_TARGET, selectedTarget => ({ selectedTarget }));

const selectGroup = createAction(actionTypes.SELECT_GROUP, (group) => ({ group }));

const updateTarget = createAction(actionTypes.UPDATE_TARGET, (target, field, value) => ({ target, field, value }));

export { selectTarget };
export { selectGroup };
export { updateTarget };
export default { selectTarget, selectGroup, updateTarget };
