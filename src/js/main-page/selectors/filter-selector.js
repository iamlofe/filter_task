import { createSelector } from 'reselect';
import { List } from 'immutable';

import { sortTools } from 'main-page/tools/sorting-tools';
import { SearchTypes } from '../constants/filter-constants';

export const getFilterSelected = (state, props) => state.filterReducer.getIn([props.filterId, 'contextIds']);

export const getFilter = state => state.mainReducer.get('initialDataFilter');

export const filterIdsSelector = state => state.filterReducer.keySeq().toArray();

export const getIsSavingData = (state, props) => state.filterReducer.getIn([props.filterId, 'isSaving']);

export const getIsRestoringData = (state, props) => state.filterReducer.getIn([props.filterId, 'isRestoring']);

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

export const contexts = createSelector(
    getFilter,
    context => new List(context.reduce((acc, element) => acc.concat(element), []))
);

export const demisions = createSelector(
    contexts,
    context => new List(context.reduce((acc, element) => acc.concat(element.get('listsDimensions').toArray()), []))
);

export const results = createSelector(
    demisions,
    demision => new List(demision.reduce((acc, element) => acc.concat(...element.get('listsResults')), []))
);

export const filteredDemisions = createSelector(selectedContext, contexts, (contextIds, contextList) =>
    contextList.reduce((acc, cur) => {
        if (contextIds.includes(cur.get('contextId'))) {
            return acc.concat(cur.get('listsDimensions'));
        }

        return acc;
    }, new List()));

export const filteredResults = createSelector(selectedDemision, filteredDemisions, (demisionIds, demisionList) => {
    const filteredResultsList = demisionList.reduce((acc, cur) => {
        if (demisionIds.includes(cur.get('demisionId'))) {
            return acc.concat(cur.get('listsResults'));
        }

        return acc;
    }, new List());

    return sortTools(filteredResultsList);
});

const filterResults = (resultsItems, condition, settingSearch) => {
    let listResultsBeginWith = new List();
    resultsItems.forEach((res) => {
        if (condition(res.title, settingSearch)) {
            listResultsBeginWith = listResultsBeginWith.push(res);
        }
    });
    return listResultsBeginWith;
};

export const searchConditions = {
    [SearchTypes.BEGIN_WITH]: (inputString, settingsSearch) => inputString.startsWith(settingsSearch.searchTitle),
    [SearchTypes.EXACT_MATCH]: (inputString, settingsSearch) => inputString === settingsSearch.searchTitle,
    [SearchTypes.OVERLAP]: (inputString, settingsSearch) => inputString.includes(settingsSearch.searchTitle)
};

export const filteredResultsWithSort = createSelector(
    filteredResults,
    getInfoSearch,
    (resultsItems, settingsSearch) => {
        const condition = searchConditions[settingsSearch.searchType];
        return filterResults(resultsItems, condition, settingsSearch);
    }
);
