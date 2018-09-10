import {
    Record,
    List,
} from 'immutable';

import RecordResults from './results-record';

const Demisions = new Record({
    id: null,
    title: null,
    listsResults: new List(),
    isActive: false,
    isAccess: false,
    demisionsSave: []
})

export default class RecordDemisions extends Demisions {
    static parse(demisions, contextId) {
        return new RecordDemisions({
            id: demisions.id,
            title: demisions.title,
            contextId: contextId,
            listsResults: new List(demisions.listResults.map(r => RecordResults.parse(r, contextId, demisions.id))),
        })
    }
}