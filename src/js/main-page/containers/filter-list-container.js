import {
    connect
} from 'react-redux';

import FilterList from '../components/filter-list/filter-list';

import {
    createNewFilter,
    onOpenContextList,
    onOpenFilter,
    onOpenDemisionsList
} from '../actions/filter-actions.js'

export default connect(
    state => ({
        filterList: state.filterReducer.get('structureContext'),

    }),
    dispatch => ({
        onPushDataFilter: (dataFilter) => dispatch(createNewFilter(dataFilter)),
        onOpenFilter: (id) => dispatch(onOpenFilter(id))
    }),
)(FilterList);