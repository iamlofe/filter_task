import { Map, List } from 'immutable';

import filterReducer from 'main-page/reducers/filter-reducer';
import { GetFilterReducer } from '../../main/mock-data/mock-create-filter-reducer';
import {
    getMockFilterState,
    getMockFilterStateWithExistsResult,
    getMockStateWithExistsContextId,
    getMockStateWithExistsContextIdEqual,
    getMockStateWithExistsDemisionId,
    getMockStateWithExistsDemisionIdEqual,
    getMockStateFilterForDeliting,
    getMockStateMainItems,
    getMockStateRestoringData
} from '../mock-store/mock-filter-reducer';

const filterIdTest = 'testId';
jest.mock('main-page/tools/generation-id-tool', () => ({
    idGenerator: jest.fn().mockImplementation(() => 'testId')
}));

describe('Main reducer', () => {
    it('should return the initial state', () => {
        expect(filterReducer(undefined, {})).toEqual(new Map());
    });

    it('should create new display without the craching', () => {
        expect(filterReducer(undefined, {
            type: 'CREATE_FILTER'
        })).toEqual(new Map({
            [filterIdTest]: new GetFilterReducer()
        }));
    });

    it('should change the search of type', () => {
        const searchType = 'overlap';

        expect(filterReducer(undefined, {
            type: 'CHOOSE_TYPE_SEARCH',
            payload: {
                filterId: 'testId',
                type: searchType
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                searchType
            })
        }));
    });

    it('change field the search title', () => {
        const searchTitle = 'lol';

        expect(filterReducer(undefined, {
            type: 'INPUT_TITLE_SEARCH',
            payload: {
                filterId: 'testId',
                searchTitle
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                searchTitle
            })
        }));
    });

    it('should add contextId', () => {
        const contextId = '1';

        expect(filterReducer(undefined, {
            type: 'CHANGE_STATE_CONTEXT',
            payload: {
                filterId: 'testId',
                contextId
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                contextIds: new Map({
                    [contextId]: new Map()
                })
            })
        }));
    });

    it('should delete contextId as it already exists', () => {
        const contextId = '1';

        expect(filterReducer(getMockStateWithExistsContextId(contextId), {
            type: 'CHANGE_STATE_CONTEXT',
            payload: {
                filterId: 'testId',
                contextId
            }
        })).toEqual(getMockStateWithExistsContextIdEqual());
    });

    it('should add demisionId', () => {
        const contextId = '1';
        const demisionId = '2';

        expect(filterReducer(undefined, {
            type: 'CHANGE_STATE_DEMISSION',
            payload: {
                filterId: 'testId',
                contextId,
                demisionId
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                contextIds: new Map({
                    [contextId]: new Map({
                        [demisionId]: new List()
                    })
                })
            })
        }));
    });

    it('should delete demisionId as it already exists', () => {
        const contextId = '1';
        const demisionId = '2';

        expect(filterReducer(getMockStateWithExistsDemisionId(contextId, demisionId), {
            type: 'CHANGE_STATE_DEMISSION',
            payload: {
                filterId: filterIdTest,
                contextId,
                demisionId
            }
        })).toEqual(getMockStateWithExistsDemisionIdEqual(contextId));
    });

    it('should add resultId', () => {
        const contextId = '1';
        const demisionId = '2';
        const resultId = '3';

        expect(filterReducer(getMockFilterState(filterIdTest, contextId, demisionId, resultId), {
            type: 'CHANGE_STATE_RESULT',
            payload: {
                filterId: filterIdTest,
                contextId,
                demisionId,
                resultId
            }
        })).toEqual(getMockFilterStateWithExistsResult(resultId));
    });

    it('should change state savingData', () => {
        expect(filterReducer(undefined, {
            type: 'CHANGE_STATE_SAVING_DATA',
            payload: {
                filterId: filterIdTest
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                isSaving: true
            })
        }));
    });

    it('should change state restoringData', () => {
        expect(filterReducer(undefined, {
            type: 'CHANGE_STATE_RESTORING_DATA',
            payload: {
                filterId: filterIdTest
            }
        })).toEqual(new Map({
            [filterIdTest]: new Map({
                isRestoring: true
            })
        }));
    });

    it('should delete filter', () => {
        expect(filterReducer(getMockStateFilterForDeliting(), {
            type: 'DELETE_FILTER',
            payload: {
                filterId: filterIdTest
            }
        }).count()).toEqual(0);
    });

    it('should restore data', () => {
        expect(filterReducer(undefined, {
            type: 'ON_RESTORE_SAVING_DATA',
            payload: {
                filterId: filterIdTest,
                data: getMockStateRestoringData()
            }
        })).toEqual(new Map({
            [filterIdTest]: getMockStateRestoringData()
        }));
    });
});
