import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const getFilter = state => state.filterReducer;
const getContext = context => context;


export const selectContext = createSelector(
    getFilter,
    filter => filter.map(currentFilter => currentFilter.get('contextIds'))
);

export const selectDemision = createSelector(
    getContext,
    filter => filter.map((filterId) => {
        const demisions = [];
        filterId.forEach((context) => {
            context.forEach((key, dem) => {
                demisions.push(dem);
            });
        });
        return new List(demisions);
    })
);

export const selectResults = createSelector(
    getContext,
    filter => filter.map((filterId) => {
        const results = [];
        filterId.forEach((context) => {
            context.forEach((key) => {
                results.push(...key);
            });
        });
        return new List(results);
    })
);

