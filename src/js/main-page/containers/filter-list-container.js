import { connect } from 'react-redux';

import FilterList from '../components/filter-list/filter-list';

import { createDisplay } from '../actions/filter-actions';

import { filterIdsSelector } from '../selectors/filter-selector';

import { loadData } from '../../main/actions/main-actions';

export default connect(
    state => ({
        isStatusLoadData: state.mainReducer.get('isStatusLoadData'),
        filterIds: filterIdsSelector(state)
    }),
    dispatch => ({
        onLoadData: () => dispatch(loadData()),
        onCreateDisplay: () => dispatch(createDisplay())
    })
)(FilterList);
