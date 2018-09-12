import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import { createDisplay, changeStateContext, changeStateDemission, changeStateResult, chooseTypeSearch } from '../actions/filter-actions.js';

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
            filterId, contextId, demisionId, resultInfo
        }
    }) => {
        const listIds = state.getIn([filterId, contextId, demisionId]);
        const index = listIds.findIndex(result => result.get('id') === resultInfo.get('id'));
        return state.setIn([filterId, contextId, demisionId], index === -1 ? listIds.push(resultInfo) : listIds.splice(index, 1));
    },
    [chooseTypeSearch]: (state, { payload }) => {

    },
    [createDisplay]: state => state.set(idGenerator(), new Map()),
}, initialState);
