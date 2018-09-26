import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers, pure } from 'recompose';

import Filter from '../components/filter/filter';
import LocalStorage from '../tools/local-storage-tool';

import {
    onRestoreSavingData as onRestoreSavingDataAction,
    saveDataWidget as saveDataWidgetAction,
    deleteFilter as deleteFilterAction,
    restoreDataWidget as restoreDataWidgetAction
} from '../actions/filter-actions';

import {
    getIsSavingData,
    selectedContext,
    selectedDemision,
    selectedResults,
    contexts,
    demisions,
    results,
    getIsRestoringData,
    filterIdsSelector
} from '../selectors/filter-selector';

export default compose(
    // setPropTypes({
    // filterId: PropTypes.string.isRequired,
    // onSaveState: PropTypes.func.isRequired,
    // dataWidget: PropTypes.instanceOf(CurrentContext).isRequired,
    // onRestoreState: PropTypes.func.isRequired,
    // onToggleWidget: PropTypes.func.isRequired,
    // isWidgetOpen: PropTypes.bool.isRequired
    // }),

    withStateHandlers(
        () => ({
            isWidgetOpen: false
        }),
        {
            onToggleWidget: ({ isWidgetOpen }) => () => ({
                isWidgetOpen: !isWidgetOpen
            })
        }
    ),
    connect(
        (state, props) => ({
            dataWidget: state.filterReducer.get(props.filterId),
            isRestoreAvailable: !!LocalStorage.get(props.filterId),
            isSavingData: getIsSavingData(state, props),
            isRestoringData: getIsRestoringData(state, props),
            selectedContext: selectedContext(state, props),
            selectedDemision: selectedDemision(state, props),
            selectedResults: selectedResults(state, props),
            contexts: contexts(state),
            demisions: demisions(state),
            results: results(state),

            filterIds: filterIdsSelector(state)
        }),
        dispatch => ({
            restoreDataWidget: filterId => dispatch(restoreDataWidgetAction(filterId)),
            saveDataWidget: filterId => dispatch(saveDataWidgetAction(filterId)),
            onRestoreSavingData: filterId => dispatch(onRestoreSavingDataAction(filterId)),
            onDeleteFilter: filterId => dispatch(deleteFilterAction(filterId))
        })
    ),
    withHandlers({
        onRestoreState: ({ restoreDataWidget, filterId }) => () => {
            restoreDataWidget(filterId);
        },
        onSaveState: ({ onSaveStateWidget, filterId }) => () => {
            onSaveStateWidget(filterId);
        },
        onSaveDataWidget: ({ filterId, saveDataWidget }) => () => {
            saveDataWidget(filterId);
        },
        onDeleteFilter: ({ filterId, onDeleteFilter }) => () => {
            onDeleteFilter(filterId);
        }
    }),
    pure
)(Filter);
