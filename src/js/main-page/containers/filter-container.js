import { connect } from 'react-redux';

import Filter from '../components/filter/filter';

import { onSaveStateWidget, onRestoreSavingData } from '../actions/filter-actions';

export default connect(
    (state, props) => ({
        dataWidget: state.filterReducer.get(props.filterId),
    }),
    dispatch => ({
        onSaveStateWidget: info => dispatch(onSaveStateWidget(info)),
        onRestoreSavingData: filterId => dispatch(onRestoreSavingData(filterId))
    })
)(Filter);

