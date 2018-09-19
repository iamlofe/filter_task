import { createAction } from 'redux-actions';

export const createDisplay = createAction('CREATE_FILTER');

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

export const chooseTypeSearch = createAction('CHOOSE_TYPE_SEARCH', type => type);
export const inputTitleSearch = createAction('INPUT_TITLE_SEARCH', infoSearch => infoSearch);

export const onSaveStateWidget = createAction('ON_SAVE_STATE_WIDGET', info => info);
export const onRestoreSavingData = createAction('ON_RESTORE_SAVING_DATA');
