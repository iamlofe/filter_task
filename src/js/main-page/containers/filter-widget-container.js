import { connect } from 'react-redux';

import FilterWidget from '../components/filter-widget/filter-widget';

import { changeStateContext, changeStateDemission, changeStateResult, chooseTypeSearch, inputTitleSearch } from '../actions/filter-actions.js';

import { selectContext, selectDemision, selectResults } from '../selectors/filter-selector';

export default connect(
    state => ({
        initialFilterData: state.mainReducer.get('initialDataFilter'),
        dataFilter: state.filterReducer,
        selectContext: selectContext(state),
        selectDemision: selectDemision(selectContext(state)),
        selectResults: selectResults(selectContext(state))
    }),
    dispatch => ({
        onChangeStateContext: ids => dispatch(changeStateContext(ids)),
        onChangeStateDemission: ids => dispatch(changeStateDemission(ids)),
        onChangeStateResult: ids => dispatch(changeStateResult(ids)),
        onChooseTypeSearch: type => dispatch(chooseTypeSearch(type)),
        onInputTitleSearch: infoSearch => dispatch(inputTitleSearch(infoSearch))
    }),
)(FilterWidget);
