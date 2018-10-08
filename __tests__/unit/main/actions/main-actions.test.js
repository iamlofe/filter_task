import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getDataFilter } from 'main/actions/main-actions';
import { loadData } from 'main/actions/main-actions';

export const mockStore = configureMockStore([thunk]);

describe('main actions', () => {
    it('should create filter', () => {
        const data = 'test';

        expect(getDataFilter(data)).toEqual({
            type: 'LOAD_DATA',
            payload: {
                data
            }
        });
    });

    it('should handle async action', () => {
        const store = mockStore();
        return store.dispatch(loadData()).then(() => {
            const actions = store.getActions();
            expect(actions.length).toEqual(1);
        });
    });
});
