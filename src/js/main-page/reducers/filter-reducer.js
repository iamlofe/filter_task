import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import {
    createDisplay,
    changeStateContext,
    changeStateDemission,
    changeStateResult,
    chooseTypeSearch,
    inputTitleSearch,
    onSaveStateWidget,
    onRestoreSavingData
} from '../actions/filter-actions';

import { CurrentContext } from '../records/context-record';

import idGenerator from '../tools/generation-id-tool';

const initialState = new Map();

export default handleActions(
    {
        [changeStateContext]: (state, { payload: { filterId, contextId } }) => {
            if (state.getIn([filterId, 'contextIds', contextId])) {
                return state.deleteIn([filterId, 'contextIds', contextId]);
            }
            return state.setIn([filterId, 'contextIds', contextId], new Map());
        },
        [changeStateDemission]: (state, { payload: { filterId, contextId, demisionId } }) => {
            if (state.getIn([filterId, 'contextIds', contextId, demisionId])) {
                return state.deleteIn([filterId, 'contextIds', contextId, demisionId]);
            }
            return state.setIn([filterId, 'contextIds', contextId, demisionId], new List());
        },
        [changeStateResult]: (state, {
            payload: {
                filterId, contextId, demisionId, resultId
            }
        }) => {
            const listIds = state.getIn([filterId, 'contextIds', contextId, demisionId]);
            const index = listIds.findIndex(result => result === resultId);
            return state.setIn(
                [filterId, 'contextIds', contextId, demisionId],
                index === -1 ? listIds.push(resultId) : listIds.splice(index, 1)
            );
        },
        [chooseTypeSearch]: (state, { payload: { filterId, searchType } }) =>
            state.setIn([filterId, 'searchType'], searchType),
        [onSaveStateWidget]: (state, { payload: { filterId, dataWidget } }) =>
            state.setIn([filterId, 'savingData'], dataWidget),
        [onRestoreSavingData]: (state, { payload: { filterId } }) =>
            state.set(filterId, state.getIn([filterId, 'savingData'])),
        [inputTitleSearch]: (state, { payload: { filterId, titleSearch } }) =>
            state.setIn([filterId, 'searchTitle'], titleSearch),
        [createDisplay]: state => state.set(idGenerator(), new CurrentContext())
    },
    initialState
);
