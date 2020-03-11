import React from 'react'

export default class Emoji extends React.Component {
    render() {
        const { props } = this
        const { label, symbol } = props

        return (
            <span
                aria-hidden = {label ? 'false' : 'true'}
                aria-label = {label ? label : ''}
                className = 'emoji'
                role = 'img'
            >
                {symbol}
            </span>
        )
    }
}