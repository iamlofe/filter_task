import {
    combineReducers
} from 'redux';

import
filterReducer
from '../../main-page/reducers/filter-reducer'
import {
    mainReducer
} from './main'


export default combineReducers({
    filterReducer,
    mainReducer
});