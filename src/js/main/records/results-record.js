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
            resultId: result.id,
            title: result.title,
            demisionId,
            contextId
        });
    }
}
