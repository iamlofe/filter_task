import {
    Record,
    List,
} from 'immutable';

import RecordDemisions from './dimensions-record';

import {
    ActiveDemisions
} from './dimensions-record'

const isActiveLists = new Record({
    isActiveContext: false,
    isActiveDemision: false,
    isActiveResult: false,
    isOpenFilter: false
})

const Context = new Record({
    id: null,
    title: null,
    listsDimensions: new List(),
    isAccess: true,
    isActive: false,
    isActiveLists: null
});



export const RecordInitialData = new Record({
    structureContext: new List()
})
export default class RecordContext extends Context {
    static parse(context) {

        return new RecordContext({
            id: context.id,
            title: context.title,
            listsDimensions: new List(context.listsDimensions.map(dimension => RecordDemisions.parse(dimension, context.id))),
            isActiveLists: new isActiveLists()
        })
    }
}