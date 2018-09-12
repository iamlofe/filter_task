import { Record, Map } from 'immutable';

export const CurrentContext = new Record({
    searchTitle: null,
    searchType: null,
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
