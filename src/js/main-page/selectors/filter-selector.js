import { createSelector } from 'reselect';
import { List } from 'immutable';

import { searchTypes } from '../constants/filter-constants';

const getFilterSelected = (state, props) => state.filterReducer.getIn([props.filterId, 'contextIds']);

const getFilter = state => state.mainReducer.get('initialDataFilter');

const getInfoSearch = (state, props) => ({
    searchType: state.filterReducer.getIn([props.filterId, 'searchType']),
    searchTitle: state.filterReducer.getIn([props.filterId, 'searchTitle'])
});

export const selectedContext = createSelector(getFilterSelected, contexts => contexts.keySeq().toList());

export const selectedDemision = createSelector(
    getFilterSelected,
    contexts => new List(contexts.reduce((acc, element) => acc.concat(element.keySeq().toArray()), []))
);

export const selectedResults = createSelector(getFilterSelected, (contexts) => {
    const demisionSelectList = contexts.reduce((acc, element) => acc.concat(element), []);
    const selectResultsList = demisionSelectList.reduce((acc, element) => acc.concat(element.toArray()), []);

    return new List(selectResultsList.reduce((acc, element) => acc.concat(element.toArray()), []));
});

export const contextsList = createSelector(
    getFilter,
    contexts => new List(contexts.reduce((acc, element) => acc.concat(element), []))
);

export const demisionsList = createSelector(
    contextsList,
    contexts => new List(contexts.reduce((acc, element) => acc.concat(element.get('listsDimensions').toArray()), []))
);

export const resultsList = createSelector(
    demisionsList,
    demisions => new List(demisions.reduce((acc, element) => acc.concat(...element.get('listsResults')), []))
);

export const filteredDemisions = createSelector(selectedContext, contextsList, (contextIds, contextList) => {
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

export const filteredResults = createSelector(filteredDemisions, selectedDemision, (demisionIds, demisionList) => {
    let filteredResultsList = new List();
    demisionIds.forEach((demision) => {
        if (demisionList.includes(demision.get('demisionId'))) {
            demision.get('listsResults').forEach((result) => {
                filteredResultsList = filteredResultsList.push(result);
            });
        }
    });
    return filteredResultsList.sort((prev, next) => {
        if (prev.get('title') > next.get('title')) {
            return 1;
        }

        if (prev.get('title') < next.get('title')) {
            return -1;
        }

        return 0;
    });
});

const filterResults = (results, path, settingSearch) => {
    let listResultsBeginWith = new List();
    results.forEach((res) => {
        if (path.condition(res.title, settingSearch)) {
            listResultsBeginWith = listResultsBeginWith.push(res);
        }
    });
    return listResultsBeginWith;
};

export const filteredResultsWithSort = createSelector(filteredResults, getInfoSearch, (results, settingsSearch) => {
    if (settingsSearch.searchType === searchTypes.beginWith.title) {
        return filterResults(results, searchTypes.beginWith, settingsSearch);
    }

    if (settingsSearch.searchType === searchTypes.exactMatch.title) {
        return filterResults(results, searchTypes.exactMatch, settingsSearch);
    }

    if (settingsSearch.searchType === searchTypes.overlap.title) {
        return filterResults(results, searchTypes.overlap, settingsSearch);
    }
});
