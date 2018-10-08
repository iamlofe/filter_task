import { Map } from 'immutable';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    saveDataWidget,
    deleteFilter,
    createDisplay,
    changeStateContext,
    changeStateDemission,
    changeStateResult,
    chooseTypeSearch,
    inputTitleSearch,
    onSaveStateWidget,
    onRestoreSavingData,
    changeStateSavingData,
    changeStateRestoringData,
    restoreDataWidget
} from 'main-page/actions/filter-actions';
import { getMockStateMainItems } from '../mock-store/mock-filter-reducer';

export const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('filter actions', () => {
    const filterId = 'test';

    it('should delete the filter', () => {
        expect(deleteFilter(filterId)).toEqual({
            type: 'DELETE_FILTER',
            payload: {
                filterId
            }
        });
    });

    it('should create the filter', () => {
        expect(createDisplay()).toEqual({
            type: 'CREATE_FILTER'
        });
    });

    it('should change state of the context of the filter', () => {
        const contextId = 2;

        expect(changeStateContext(filterId, contextId)).toEqual({
            type: 'CHANGE_STATE_CONTEXT',
            payload: {
                filterId,
                contextId
            }
        });
    });

    it('should change state of the demision of the filter', () => {
        const contextId = 2;
        const demisionId = 1;

        expect(changeStateDemission(filterId, contextId, demisionId)).toEqual({
            type: 'CHANGE_STATE_DEMISSION',
            payload: {
                filterId,
                contextId,
                demisionId
            }
        });
    });

    it('should change state of the result of the filter', () => {
        const contextId = 2;
        const demisionId = 1;
        const resultId = 10000;

        expect(changeStateResult(filterId, contextId, demisionId, resultId)).toEqual({
            type: 'CHANGE_STATE_RESULT',
            payload: {
                filterId,
                contextId,
                demisionId,
                resultId
            }
        });
    });

    it('should change state of type searching', () => {
        const type = 'overlap';

        expect(chooseTypeSearch(filterId, type)).toEqual({
            type: 'CHOOSE_TYPE_SEARCH',
            payload: {
                filterId,
                type
            }
        });
    });

    it('should input string of searching', () => {
        const searchTitle = 'lolol';

        expect(inputTitleSearch(filterId, searchTitle)).toEqual({
            type: 'INPUT_TITLE_SEARCH',
            payload: {
                filterId,
                searchTitle
            }
        });
    });

    it('should save state of widget', () => {
        expect(onSaveStateWidget(filterId)).toEqual({
            type: 'ON_SAVE_STATE_WIDGET',
            payload: {
                filterId
            }
        });
    });

    it('should restore state of widget', () => {
        const data = new Map();

        expect(onRestoreSavingData(filterId, data)).toEqual({
            type: 'ON_RESTORE_SAVING_DATA',
            payload: {
                filterId,
                data
            }
        });
    });

    it('should change status of saving data', () => {
        expect(changeStateSavingData(filterId)).toEqual({
            type: 'CHANGE_STATE_SAVING_DATA',
            payload: {
                filterId
            }
        });
    });

    it('should change status rstoring data', () => {
        expect(changeStateRestoringData(filterId)).toEqual({
            type: 'CHANGE_STATE_RESTORING_DATA',
            payload: {
                filterId
            }
        });
    });

    it('should handle async saveDataWidget  action', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => getMockStateMainItems());
        await saveDataWidget('test')(dispatch, getState);
        expect(dispatch).toBeCalledWith(changeStateSavingData('test'));
        expect(dispatch).toBeCalledWith(changeStateSavingData('test'));
    });

    it('should handle async restoreDataWidget action', async () => {
        const dispatch = jest.fn();
        await restoreDataWidget('test')(dispatch);
        expect(dispatch).toBeCalledWith({ payload: { filterId: 'test' }, type: 'CHANGE_STATE_RESTORING_DATA' });
        expect(dispatch).toBeCalledWith({ payload: { filterId: 'test' }, type: 'CHANGE_STATE_RESTORING_DATA' });
        expect(dispatch).toBeCalledWith(changeStateRestoringData('test'));
    });
});
