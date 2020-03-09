export function BreakItem(props) {
    const React = require('react')

    const { Emoji } = require('../components/Emoji')

    const { item } = props

    return (
        <div
            className = 'break-item-container'
            style = {{
                backgroundColor: props.focusAtIndex === props.index ? 'darkslateblue' : 'gray',
                opacity: props.mode === 'Work' && props.focusAtIndex !== null && props.focusAtIndex !== props.index ? 0.2 : 1
            }}
        >
            <div>
                <p
                    className = 'break-item-title'
                >
                    Break
                </p>

                {
                    item.startedAt !== '' ?
                        <p
                            className = 'break-item-started-at-and-minutes'
                        >
                            Started at {item.startedAt} ({item.minutes} minutes)
                        </p>
                        :
                        null
                }
            </div>

            {
                item.startedAt !== '' ?
                    <div
                        className = 'break-item-emoji-background'
                    >
                        <p
                            className = 'break-item-emoji'
                        >
                            <Emoji
                                symbol = '💤'
                            />
                        </p>
                    </div>
                    :
                    <div
                        className = 'break-item-options-container'
                    >
                        {
                            props.mode === 'Work' && props.focusAtIndex === props.index ?
                                <a
                                    className = 'break-item-start-button'
                                    href = '/#'
                                >
                                    Start
                                </a>
                                :
                                null
                        }

                        {
                            props.mode === 'Edit' ?
                                <a
                                    className = 'break-item-remove-button'
                                    href = '/#'
                                    onClick = {props.onRemove}
                                >
                                    Remove
                                </a>
                                :
                                null
                        }
                    </div>
            }
        </div>
    )
}