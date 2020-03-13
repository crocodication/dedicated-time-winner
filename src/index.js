import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { unregister } from './serviceWorker'

import { Route, Switch, Redirect } from 'react-router-dom'

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <Route
                    path = "/v1"
                    component = {require('./v1/App').default}
                />

                <Route
                    path = "/v2"
                    component = {require('./v2/App').default}
                />

                <Redirect
                    to = "/v2/#"
                />
            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root')
)

unregister()