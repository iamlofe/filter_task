import { Record, List } from 'immutable';

import RecordResults from './results-record';

const Demisions = new Record({
    id: null,
    title: null,
    contextId: null,
    demisionId: null,
    listsResults: new List()
});

export default class DemisionsRecord extends Demisions {
    static parse(demisions, contextId) {
        return new DemisionsRecord({
            id: demisions.id,
            demisionId: demisions.id,
            contextId,
            title: demisions.title,
            listsResults: new List(demisions.listResults.map(r => RecordResults.parse(r, contextId, demisions.id)))
        });
    }
}
