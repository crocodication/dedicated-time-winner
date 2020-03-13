import React from 'react'

import Home from './screens/Home'

import { Redirect } from 'react-router-dom'

export default class extends React.Component {
    render() {
        require('./index.css')

        return (
            <>
                <Home />

                <Redirect
                    to = "/v2/#"
                />
            </>
        )
    }
}