export function Emoji(props) {
    const React = require('react')

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