import { Record } from 'immutable';

const Results = new Record({
    id: null,
    title: null,
});

export default class ResultsRecord extends Results {
    static parse(result) {
        return new ResultsRecord({
            id: result.id,
            title: result.title,
        });
    }
}
