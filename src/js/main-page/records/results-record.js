import {
    Record,
    List,
} from 'immutable';

import idGeneration from '../tools/generation-id-tool';

const Results = new Record({
    id: null,
    title: null,
    demisionId: null,
    contextId: null,
    isActive: false,
    isAccess: false,
    resultsSave: []
})


export default class RecordResults extends Results {
    static parse(result, ctxId, dimId) {
        return new RecordResults({
            id: result.id,
            title: result.title,
            demisionId: dimId,
            contextId: ctxId
        })
    }
}