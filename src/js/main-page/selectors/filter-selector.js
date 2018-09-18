import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const getFilterSelect = (state, props) => state.filterReducer.get(props.filterId);

const getFilter = state => state.mainReducer;
const getInfoSearch = (state, props) => ({
    searchType: state.filterReducer.getIn([props.filterId, 'searchType']),
    searchTitle: state.filterReducer.getIn([props.filterId, 'searchTitle'])
});

export const selectContext = createSelector(getFilterSelect, contexts =>
    contexts
        .get('contextIds')
        .keySeq()
        .toList());

export const selectDemision = createSelector(getFilterSelect, (contexts) => {
    const contextIds = contexts.get('contextIds').reduce((acc, element) => acc.concat(element), []);
    const demisionSelect = contextIds.reduce((acc, element) => acc.concat(...element.keySeq()), []);

    return new List(demisionSelect);
});

export const selectResults = createSelector(getFilterSelect, (contexts) => {
    const contextSelectList = contexts.get('contextIds').reduce((acc, element) => acc.concat(element), []);
    const demisionSelectList = contextSelectList.reduce((acc, element) => acc.concat(element), []);
    const selectResultsList = demisionSelectList.reduce((acc, element) => acc.concat(...element.toArray()), []);
    const selectResultIds = selectResultsList.reduce((acc, element) => acc.concat(...element.toArray()), []);

    return new List(selectResultIds);
});

export const contextsList = createSelector(getFilter, (contexts) => {
    const contextList = contexts.get('initialDataFilter').reduce((acc, element) => acc.concat(element), []);

    return new List(contextList);
});

export const demisionsList = createSelector(getFilter, (contexts) => {
    const demisionList = contexts
        .get('initialDataFilter')
        .reduce((acc, element) => acc.concat(...element.get('listsDimensions').toArray()), []);

    return new List(demisionList);
});

export const resultsList = createSelector(getFilter, (contexts) => {
    const contextList = contexts.get('initialDataFilter').reduce((acc, element) => acc.concat(element), []);
    const demisionList = contextList.reduce(
        (acc, element) => acc.concat(...element.get('listsDimensions').toArray()),
        []
    );
    const resultList = demisionList.reduce((acc, element) => acc.concat(...element.get('listsResults')), []);

    return new List(resultList);
});

export const filteredDemisions = createSelector(selectContext, contextsList, (contextIds, contextList) => {
    let filteredDemisionsList = new List();

    contextList.forEach((context) => {
        if (contextIds.includes(context.get('contextId'))) {
            context.get('listsDimensions').forEach((demision) => {
                filteredDemisionsList = filteredDemisionsList.push(demision);
            });
        }
    });

    return filteredDemisionsList;
});

export const filteredResults = createSelector(filteredDemisions, selectDemision, (demisionIds, demisionList) => {
    let filteredResultsList = new List();
    demisionIds.forEach((demision) => {
        if (demisionList.includes(demision.get('demisionId'))) {
            demision.get('listsResults').forEach((result) => {
                filteredResultsList = filteredResultsList.push(result);
            });
        }
    });
    return filteredResultsList.sort();
});

export const filteredResultsWithSort = createSelector(filteredResults, getInfoSearch, (results, settingsSearch) => {
    if (settingsSearch.searchType === 'beginWith') {
        let listResultsBeginWith = new List();
        results.forEach((res) => {
            if (res.title.startsWith(settingsSearch.searchTitle)) {
                listResultsBeginWith = listResultsBeginWith.push(res);
            }
        });
        return listResultsBeginWith;
    }

    if (settingsSearch.searchType === 'exactMatch') {
        let listResultsExactMatch = new List();
        results.forEach((res) => {
            if (res.title === settingsSearch.searchTitle) {
                listResultsExactMatch = listResultsExactMatch.push(res);
            }
        });
        return listResultsExactMatch;
    }

    if (settingsSearch.searchType === 'overlap') {
        let listResultsOverlap = new List();
        results.forEach((res) => {
            if (res.title.includes(settingsSearch.searchTitle)) {
                listResultsOverlap = listResultsOverlap.push(res);
            }
        });
        return listResultsOverlap;
    }
});
