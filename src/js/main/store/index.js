import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'main/reducers';

export default (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );
    return store;
};
