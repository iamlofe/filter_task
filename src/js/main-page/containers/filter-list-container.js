import { connect } from 'react-redux';

import FilterList from '../components/filter-list/filter-list';

import { createDisplay } from '../actions/filter-actions.js';

import { loadData } from '../../main/actions/main-actions';


export default connect(
    state => ({
        initialFilterData: state.mainReducer.get('initialDataFilter'),
        isStatusLoadData: state.mainReducer.get('isStatusLoadData'),
        filterIds: state.filterReducer.keySeq().toArray(),
        dataFilter: state.filterReducer,
    }),
    dispatch => ({
        onLoadData: () => dispatch(loadData()),
        onCreateDisplay: () => dispatch(createDisplay())
    }),
)(FilterList);
