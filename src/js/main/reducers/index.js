import {
    combineReducers
} from 'redux';

import
dataFilterReducer
from '../../main-page/reducers/filter-reducer'


export default combineReducers({
    filterReducer: dataFilterReducer
});