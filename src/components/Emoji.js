export function Emoji(props) {
    const React = require('react')

    return (
        <span
            aria-hidden = {props.label ? 'false' : 'true'}
            aria-label = {props.label ? props.label : ''}
            className = 'emoji'
            role = 'img'
        >
            {props.symbol}
        </span>
    )
}