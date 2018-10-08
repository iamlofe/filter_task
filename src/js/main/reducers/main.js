import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import RecordInitialData from '../../main/records/initial-data-record';

import { getDataFilter } from '../actions/main-actions';

const initialData = new RecordInitialData();

export const mainReducer = handleActions(
    {
        [getDataFilter]: (state, { payload: { data } }) =>
            state.set('initialDataFilter', new List(data)).set('isStatusLoadData', false)
    },
    initialData
);
