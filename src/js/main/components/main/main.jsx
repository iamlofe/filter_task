import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ROUTES from 'main/constants/page-constants';

import './main.scss';

const history = createBrowserHistory();

export default () => (
    <Router history={history}>
        <div className="page-container">
            <Switch>
                {ROUTES.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        render={props => <route.component {...props} routes={route.routes} />}
                    />
                ))}
            </Switch>
        </div>
    </Router>
);
