import { createAction } from 'redux-actions';

import RecordContext from 'main/records/contexts-record';

import dataFilter from '../../../../data.json';

export const getDataFilter = createAction('LOAD_DATA', data => data);

const getData = () =>
    new Promise((res) => {
        setTimeout(() => {
            res(dataFilter);
        }, 1000);
    });
// make parse above. there is no start loading action

export const loadData = () => async (dispatch) => {
    const data = await getData();
    const parsed = data.map(context => RecordContext.parse(context));

    dispatch(getDataFilter(parsed));
};
