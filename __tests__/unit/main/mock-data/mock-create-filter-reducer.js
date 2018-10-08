import { Map } from 'immutable';

import { CurrentContext } from 'main-page/records/filter-record';

export const GetFilterReducer = () =>
    new CurrentContext({
        searchTitle: '',
        searchType: 'beginWith',
        isSaving: false,
        isRestoring: false,
        contextIds: new Map()
    });

export const GetFilterInitialData = () => new CurrentContext();
