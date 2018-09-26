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
    onRestoreSavingData,
    changeStateSavingData,
    deleteFilter,
    changeStateRestoringData
} from '../actions/filter-actions';

import { SearchTypes } from '../constants/filter-constants';

import { CurrentContext } from '../records/filter-record';

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
        [chooseTypeSearch]: (state, { payload: { filterId, type } }) => state.setIn([filterId, 'searchType'], type),
        [onSaveStateWidget]: (state, { payload: { filterId } }) =>
            state.setIn([filterId, 'savingData'], state.getIn([filterId, 'contextIds'])),
        [onRestoreSavingData]: (state, { payload: { filterId, data } }) =>
            state
                .setIn([filterId, 'contextIds'], data.get('contextIds'))
                .setIn([filterId, 'searchTitle'], data.get('searchTitle'))
                .setIn([filterId, 'searchType'], data.get('searchType')),
        [inputTitleSearch]: (state, { payload: { filterId, titleSearch } }) =>
            state.setIn([filterId, 'searchTitle'], titleSearch),
        [changeStateSavingData]: (state, { payload: { filterId } }) =>
            state.setIn([filterId, 'isSaving'], !state.getIn([filterId, 'isSaving'])),
        [createDisplay]: state =>
            state.set(
                idGenerator(),
                new CurrentContext({
                    searchTitle: '',
                    searchType: SearchTypes.BEGIN_WITH,
                    savingData: null,
                    isSaving: false,
                    isRestoring: false,
                    contextIds: new Map()
                })
            ),
        [changeStateRestoringData]: (state, { payload: { filterId } }) =>
            state.setIn([filterId, 'isRestoring'], !state.getIn([filterId, 'isRestoring'])),
        [deleteFilter]: (state, { payload: { filterId } }) => state.delete(filterId)
    },
    initialState
);
