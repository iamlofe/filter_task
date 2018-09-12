import { Record, List } from 'immutable';

import RecordDemisions from './dimensions-record';

const Context = new Record({
    id: null,
    title: null,
    listsDimensions: new List(),
});

export default class ContextRecord extends Context {
    static parse(context) {
        return new ContextRecord({
            id: context.id,
            title: context.title,
            listsDimensions:
                new List(context.listsDimensions.map(dimension => RecordDemisions.parse(dimension, context.id))),
        });
    }
}