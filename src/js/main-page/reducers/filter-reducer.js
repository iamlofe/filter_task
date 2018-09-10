import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import { createDisplay, changeStateContext, changeStateDemission, changeStateResult } from '../actions/filter-actions.js';

import idGenerator from '../tools/generation-id-tool';

const initialState = new Map();

export default handleActions({
    [changeStateContext]: (state, { payload: { filterId, contextId } }) => {
        if (state.getIn([filterId, contextId])) {
            return state.deleteIn([filterId, contextId]);
        }
        return state.setIn([filterId, contextId], new Map());
    },
    [changeStateDemission]: (state, { payload: { filterId, contextId, demisionId } }) => {
        if (state.getIn([filterId, contextId, demisionId])) {
            return state.deleteIn([filterId, contextId, demisionId]);
        }
        return state.setIn([filterId, contextId, demisionId], new List());
    },
    [changeStateResult]: (state, {
        payload: {
            filterId, contextId, demisionId, resultId
        }
    }) => 
        // if (state.getIn([filterId, contextId, demisionId]).findIndex(resultId) === -1) {
             state.updateIn([filterId, contextId, demisionId], items => items.push(resultId))
        // }
        // return state.updateIn([filterId, contextId, demisionId], items => items.delete(resultId));
    ,
    [createDisplay]: state => state.set(idGenerator(), new Map()),
}, initialState);
