import { createSelector } from 'reselect';
import { List } from 'immutable';

const getFilterSelect = (state, props) =>
    state.filterReducer.get(props.filterId);

const getFilter = state => state.mainReducer;
const getInfoSearch = (state, props) => ({ searchType: state.filterReducer.getIn([props.filterId, 'searchType']), searchTitle: state.filterReducer.getIn([props.filterId, 'searchTitle']) });


export const selectContext = createSelector(getFilterSelect, (contexts) => {
    let contextSelect = new List();
    contexts.get('contextIds').map((demision, contextId) => {
        contextSelect = contextSelect.push(contextId);
    });

    return new List(contextSelect);
});

export const selectDemision = createSelector(getFilterSelect, (contexts) => {
    let demisionSelect = new List();
    contexts.get('contextIds').map((context) => {
        context.map((result, demisionId) => {
            demisionSelect = demisionSelect.push(demisionId);
        });
    });
    return demisionSelect;
});

export const selectResults = createSelector(getFilterSelect, (contexts) => {
    let resultSelect = new List();
    contexts.get('contextIds').map((context) => {
        context.map((result) => {
            result.map((resultId) => {
                resultSelect = resultSelect.push(resultId);
            });
        });
    });
    return resultSelect;
});

export const contextsList = createSelector(getFilter, (contexts) => {
    let listsContexts = new List();
    contexts.get('initialDataFilter').map((context) => {
        listsContexts = listsContexts.push(context);
    });
    return listsContexts;
});

export const demisionsList = createSelector(getFilter, (contexts) => {
    let listsDimensions = new List();
    contexts.get('initialDataFilter').map((context) => {
        context.get('listsDimensions').map((dem) => {
            listsDimensions = listsDimensions.push(dem);
        });
    });
    return listsDimensions;
});

export const resultsList = createSelector(getFilter, (contexts) => {
    let listResults = new List();

    contexts.get('initialDataFilter').map((cont) => {
        cont.get('listsDimensions').map((dem) => {
            dem.get('listsResults').map((res) => {
                listResults = listResults.push(res);
            });
        });
    });
    return listResults;
});

export const filteredDemisions = createSelector(
    selectContext,
    contextsList,
    (contextIds, contextList) => {
        let filteredDemisionsList = new List();

        contextList.map((context) => {
            if (contextIds.includes(context.get('contextId'))) {
                context.get('listsDimensions').map((demision) => {
                    filteredDemisionsList = filteredDemisionsList.push(demision);
                });
            }
        });
        return filteredDemisionsList;
    }
);

export const filteredResults = createSelector(
    filteredDemisions,
    selectDemision,
    (demisionIds, demisionList) => {
        let filteredResultsList = new List();
        demisionIds.map((demision) => {
            if (demisionList.includes(demision.get('demisionId'))) {
                demision.get('listsResults').map((result) => {
                    filteredResultsList = filteredResultsList.push(result);
                });
            }
        });
        return filteredResultsList.sort();
    }
);

export const filteredResultsWithSort = createSelector(
    filteredResults,
    getInfoSearch,
    (results, settingsSearch) => {
        // exactMatch
        // overlap
        // beginWith
        if (settingsSearch.searchType === 'beginWith') {
            let listResultsBeginWith = new List();
            results.map((res) => {
                if (res.title.startsWith(settingsSearch.searchTitle)) {
                    listResultsBeginWith = listResultsBeginWith.push(res);
                }
            });
            return listResultsBeginWith;
        } else if (settingsSearch.searchType === 'exactMatch') {
            let listResultsExactMatch = new List();
            results.map((res) => {
                if (res.title === settingsSearch.searchTitle) {
                    listResultsExactMatch = listResultsExactMatch.push(res);
                }
            });
            return listResultsExactMatch;
        } else if (settingsSearch.searchType === 'overlap') {
            let listResultsOverlap = new List();
            results.map((res) => {
                if (res.title.includes(settingsSearch.searchTitle)) {
                    listResultsOverlap = listResultsOverlap.push(res);
                }
            });
            return listResultsOverlap;
        }
    }
);
