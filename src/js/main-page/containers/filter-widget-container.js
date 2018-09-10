import {
    connect
} from 'react-redux';

import FilterWidget from '../components/filter-widget/filter-widget';

import {
    onOpenContextList,
    onOpenFilter,
    onOpenDemisionsList,
    changeStatusContext,
    checkAccessStatus
} from '../actions/filter-actions.js'

export default connect(
    state => ({
        filterList: state.filterReducer.get('structureContext'),
    }),
    dispatch => ({
        onOpenContextList: (id) => dispatch(onOpenContextList(id)),
        onOpenDemisionsList: (id) => dispatch(onOpenDemisionsList(id)),
        onOpenFilter: (id) => dispatch(onOpenFilter(id)),
        onChangeStatusContext: (path) => dispatch(changeStatusContext(path)),
        onCheckAccessStatus: (path) => dispatch(checkAccessStatus(path))
    }),
)(FilterWidget);