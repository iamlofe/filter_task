import { Record } from 'immutable';

export const CurrentContext = new Record({
    searchTitle: null,
    searchType: null,
    isSaving: null,
    isRestoring: null,
    contextIds: null
});
