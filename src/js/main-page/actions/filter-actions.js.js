import {
    createAction
} from 'redux-actions';

export const createNewFilter = createAction("CREATE_FILTER", dataFilter => dataFilter);
export const onOpenContextList = createAction("OPEN_CONTEXT_LIST", id => id);
export const onOpenDemisionsList = createAction("OPEN_DEMISION_LIST", id => id);
export const onOpenFilter = createAction("OPEN_FILTER", id => id);

export const changeStatusContext = createAction("CHANGE_STATUS_CONTEXT", path => path);
export const changeStatusDemision = createAction("CHANGE_STATUS_DEMISION", path => path);
export const checkAccessStatus = createAction("CHECK_ACCESS_STATUS", path => path);