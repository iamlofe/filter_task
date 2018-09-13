import { connect } from 'react-redux';

import FilterWidget from '../components/filter-widget/filter-widget';

import { changeStateContext, changeStateDemission, changeStateResult, chooseTypeSearch, inputTitleSearch } from '../actions/filter-actions.js';

import { selectContext, selectDemision, selectResults, demisionsList, resultsList, contextsList, filteredDemisions, filteredResults } from '../selectors/filter-selector';

export default connect(
    (state, props) => ({
        initialFilterData: state.mainReducer.get('initialDataFilter'),
        dataFilter: state.filterReducer,
        contextsList: contextsList(state),
        demisionsList: demisionsList(state),
        resultsList: resultsList(state),
        selectContext: selectContext(state, props),
        selectDemision: selectDemision(state, props),
        selectResults: selectResults(state, props),
        filteredDemisions: filteredDemisions(state, props),
        filteredResults: filteredResults(state, props)
    }),
    dispatch => ({
        onChangeStateContext: ids => dispatch(changeStateContext(ids)),
        onChangeStateDemission: ids => dispatch(changeStateDemission(ids)),
        onChangeStateResult: ids => dispatch(changeStateResult(ids)),
        onChooseTypeSearch: type => dispatch(chooseTypeSearch(type)),
        onInputTitleSearch: infoSearch => dispatch(inputTitleSearch(infoSearch))
    }),
)(FilterWidget);
