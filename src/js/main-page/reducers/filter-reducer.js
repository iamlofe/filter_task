import {
    handleActions
} from 'redux-actions';
import {
    List
} from 'immutable'

import data from '../../main-page/constants/data.json';

import RecordContext from '../records/contexts-record';


import {
    createNewFilter,
    onOpenContextList,
    onOpenFilter,
    onOpenDemisionsList,
    changeStatusContext,
    checkAccessStatus
} from '../actions/filter-actions.js'

import {
    RecordInitialData
} from '../records/contexts-record'

const initialState = new RecordInitialData();

export default handleActions({
    [createNewFilter]: (state, action) => state.set('structureContext', state.get('structureContext').push(new List(action.payload))),
    [onOpenContextList]: (state, action) => state.setIn(['structureContext', action.payload, 0, 'isActiveLists', 'isActiveContext'], !state.getIn(['structureContext', action.payload, 0, 'isActiveLists', 'isActiveContext'])),
    [onOpenDemisionsList]: (state, action) => state.setIn(['structureContext', action.payload, 0, 'isActiveLists', 'isActiveDemision'], !state.getIn(['structureContext', action.payload, 0, 'isActiveLists', 'isActiveDemision'])),
    [onOpenFilter]: (state, action) => state.setIn(['structureContext', action.payload, 0, 'isActiveLists', 'isOpenFilter'], !state.getIn(['structureContext', action.payload, 0, 'isActiveLists', 'isOpenFilter'])),

    [changeStatusContext]: (state, action) => {
        if (action.payload.length == 2) {
            return state.setIn(['structureContext', ...action.payload, 'isActive'], !state.getIn(['structureContext', ...action.payload, 'isActive'])).setIn(['structureContext', ...action.payload, 'listsDimensions', 0, 'isAccess'], !state.getIn(['structureContext', ...action.payload, 'listsDimensions', 0, 'isAccess']))
        } else if (action.payload.length == 4) {
            return state.setIn(['structureContext', ...action.payload, 'isActive'], !state.getIn(['structureContext', ...action.payload, 'isActive'])).setIn(['structureContext', ...action.payload, 'listsResults', 0, 'isAccess'], !state.getIn(['structureContext', ...action.payload, 'listsResults', 0, 'isAccess']))
        } else {
            return state.setIn(['structureContext', ...action.payload, 'isActive'], !state.getIn(['structureContext', ...action.payload, 'isActive']))
        }
    }
}, initialState)