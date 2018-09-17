import { Record } from 'immutable';

const Results = new Record({
    id: null,
    title: null,
    contextId: null,
    demisionId: null,
    resultId: null
});

export default class ResultsRecord extends Results {
    static parse(result, contextId, demisionId) {
        return new ResultsRecord({
            id: result.id,
            demisionId,
            contextId,
            resultId: result.id,
            title: result.title,

        });
    }
}
