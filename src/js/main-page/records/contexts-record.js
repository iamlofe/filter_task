import { Record, List } from 'immutable';

import RecordDemisions from './dimensions-record';

const Context = new Record({
    id: null,
    title: null,
    listsDimensions: new List(),
    isAccess: true,
    isActive: false,
});

export default class RecordContext extends Context {
    static parse(context) {
        return new RecordContext({
            id: context.id,
            title: context.title,
            listsDimensions:
                new List(context.listsDimensions.map(dimension => RecordDemisions.parse(dimension, context.id))),
        });
    }
}
