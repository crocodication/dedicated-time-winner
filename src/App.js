import React from 'react'

import Home from './screens/Home'

export default class extends React.Component {
    render() {
        require('./index.css')

        return (
            <Home />
        )
    }
}