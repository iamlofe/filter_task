import { Record, Map } from 'immutable';

export const CurrentContext = new Record({
    searchTitle: '',
    searchType: 'exactMatch',
    savingData: null,
    contextIds: new Map()
});

export default class CurrentContextRecord extends CurrentContext {
    static parse(info) {
        return new CurrentContextRecord({
            searchTitle: info.searchTitle,
            searchType: info.searchType
        });
    }
}
