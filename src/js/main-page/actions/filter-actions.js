import { createAction } from 'redux-actions';

import parseTool from 'main-page/tools/parsing-local-storage-tool';

import LocalStorage from '../tools/local-storage-tool';

export const createDisplay = createAction('CREATE_FILTER');
export const deleteFilter = createAction('DELETE_FILTER', filterId => ({ filterId }));

export const changeStateContext = createAction('CHANGE_STATE_CONTEXT', (filterId, contextId) => ({
    filterId,
    contextId
}));
export const changeStateDemission = createAction('CHANGE_STATE_DEMISSION', (filterId, contextId, demisionId) => ({
    filterId,
    contextId,
    demisionId
}));
export const changeStateResult = createAction('CHANGE_STATE_RESULT', (filterId, contextId, demisionId, resultId) => ({
    filterId,
    contextId,
    demisionId,
    resultId
}));

export const chooseTypeSearch = createAction('CHOOSE_TYPE_SEARCH', (filterId, type) => ({ filterId, type }));
export const inputTitleSearch = createAction('INPUT_TITLE_SEARCH', (filterId, titleSearch) => ({
    filterId,
    titleSearch
}));

export const onSaveStateWidget = createAction('ON_SAVE_STATE_WIDGET', filterId => ({ filterId }));
export const onRestoreSavingData = createAction('ON_RESTORE_SAVING_DATA', (filterId, data) => ({ filterId, data }));

export const changeStateSavingData = createAction('CHANGE_STATE_SAVING_DATA', filterId => ({
    filterId
}));

export const changeStateRestoringData = createAction('CHANGE_STATE_RESTORING_DATA', filterId => ({
    filterId
}));

const saveData = (getState, filterId) =>
    new Promise((res) => {
        setTimeout(() => {
            const savingData = getState()
                .filterReducer.getIn([filterId, 'contextIds'])
                .toJS();
            LocalStorage.set(filterId, JSON.stringify(savingData));

            res();
        }, 1000);
    });

const restoreData = filterId =>
    new Promise((res) => {
        setTimeout(() => {
            const restoringData = LocalStorage.get(filterId);
            const waitingDataParse = JSON.parse(restoringData);
            res(parseTool(waitingDataParse));
        }, 1000);
    });

export const saveDataWidget = filterId => async (dispatch, getState) => {
    dispatch(changeStateSavingData(filterId));
    await saveData(getState, filterId);
    dispatch(changeStateSavingData(filterId));
};

export const restoreDataWidget = filterId => async (dispatch) => {
    dispatch(changeStateRestoringData(filterId));
    const data = await restoreData(filterId);
    dispatch(onRestoreSavingData(filterId, data));
    dispatch(changeStateRestoringData(filterId));
};
