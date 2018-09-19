import { connect } from 'react-redux';

import FilterWidget from '../components/filter-widget/filter-widget';

import {
    changeStateContext,
    changeStateDemission,
    changeStateResult,
    chooseTypeSearch,
    inputTitleSearch
} from '../actions/filter-actions';

import {
    selectedContext,
    selectedDemision,
    selectedResults,
    demisionsList,
    resultsList,
    contextsList,
    filteredDemisions,
    filteredResults,
    filteredResultsWithSort
} from '../selectors/filter-selector';

export default connect(
    (state, props) => ({
        initialFilterData: state.mainReducer.get('initialDataFilter'),
        dataFilter: state.filterReducer.get(props.filterId),
        contextsList: contextsList(state),
        demisionsList: demisionsList(state),
        resultsList: resultsList(state),
        selectedContext: selectedContext(state, props),
        selectedDemision: selectedDemision(state, props),
        selectedResults: selectedResults(state, props),
        filteredDemisions: filteredDemisions(state, props),
        filteredResults: filteredResults(state, props),
        filteredResultsWithSort: filteredResultsWithSort(state, props)
    }),
    dispatch => ({
        onChangeStateContext: (filterId, contextId) => dispatch(changeStateContext(filterId, contextId)),
        onChangeStateDemission: (filterId, contextId, demisionId) =>
            dispatch(changeStateDemission(filterId, contextId, demisionId)),
        onChangeStateResult: (filterId, contextId, demisionId, resultId) =>
            dispatch(changeStateResult(filterId, contextId, demisionId, resultId)),
        onChooseTypeSearch: type => dispatch(chooseTypeSearch(type)),
        onInputTitleSearch: infoSearch => dispatch(inputTitleSearch(infoSearch))
    })
)(FilterWidget);
