import { List } from 'immutable';

import RecordInitialData from 'main/records/initial-data-record';

import { mainReducer } from 'main/reducers/main';
import { getDataFilter } from 'main/actions/main-actions';

describe('Main reducer', () => {
    it('should return the initial state', () => {
        expect(mainReducer(undefined, {})).toEqual(new RecordInitialData({
            initialDataFilter: new List(),
            isStatusLoadData: true
        }));
    });

    it('should return change status load', () => {
        expect(mainReducer(undefined, getDataFilter())).toEqual(new RecordInitialData({
            initialDataFilter: new List(),
            isStatusLoadData: false
        }));
    });
});
