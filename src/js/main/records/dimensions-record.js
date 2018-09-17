import { Record, List } from 'immutable';

import RecordResults from './results-record';

const Demisions = new Record({
    id: null,
    title: null,
    contextId: null,
    listsResults: new List(),
    demisionId: null
});

export default class DemisionsRecord extends Demisions {
    static parse(demisions, contextId) {
        return new DemisionsRecord({
            demisionId: demisions.id,
            title: demisions.title,
            contextId,
            listsResults: new List(demisions.listResults.map(r =>
                RecordResults.parse(r, contextId, demisions.id)))
        });
    }
}
