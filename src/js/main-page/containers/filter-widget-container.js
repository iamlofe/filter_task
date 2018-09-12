import { connect } from 'react-redux';

import FilterWidget from '../components/filter-widget/filter-widget';

import { changeStateContext, changeStateDemission, changeStateResult, chooseTypeSearch } from '../actions/filter-actions.js';

export default connect(
    state => ({
        initialFilterData: state.mainReducer.get('initialDataFilter'),
        dataFilter: state.filterReducer,
    }),
    dispatch => ({
        onChangeStateContext: ids => dispatch(changeStateContext(ids)),
        onChangeStateDemission: ids => dispatch(changeStateDemission(ids)),
        onChangeStateResult: ids => dispatch(changeStateResult(ids)),
        onChooseTypeSearch: type => dispatch(chooseTypeSearch(type))
    }),
)(FilterWidget);
