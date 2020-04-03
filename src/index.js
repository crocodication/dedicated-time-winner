import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { unregister } from './serviceWorker'

import { Switch, Redirect } from 'react-router-dom'

import App from './App'

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <App />

                <Redirect
                    to = "/dedicated-time-winner/#"
                />
            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root')
)

unregister()