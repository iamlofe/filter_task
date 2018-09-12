import { Record } from 'immutable';

const CurrentContext = new Record({
    searchTitle: null,
    searchType: null,
    demesions: null,
    id: null,

});

export default class CurrentContextRecord extends CurrentContext {
    static parse(info) {
        return new CurrentContextRecord({
            title: info.title,
            id: info.id,
            searchTitle: info.searchTitle,
            searchType: info.searchType
        });
    }
}
