import React from 'react';
import { Provider } from 'react-redux';

import createStore from 'main/store';

import MainContainer from 'main/components/main/main';

const store = createStore();

export default () => (
    <Provider store={store}>
        <MainContainer />
    </Provider>
);
