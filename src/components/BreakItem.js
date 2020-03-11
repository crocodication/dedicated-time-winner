import React from 'react'

import Emoji from '../components/Emoji'

export default class extends React.Component {
    render() {
        const { props } = this
        const { focusAtIndex, index, item, mode, onRemove } = props
        const { minutes, startedAt } = item

        return (
            <div
                className = {'break-item-container-' + mode.toLowerCase() + '-mode'}
                style = {{
                    backgroundColor: focusAtIndex === index ? 'darkslateblue' : 'gray'
                }}
            >
                <div>
                    <p
                        className = 'break-item-title'
                    >
                        Break
                    </p>

                    {
                        startedAt !== '' ?
                            <p
                                className = 'break-item-started-at-and-minutes'
                            >
                                Started at {startedAt} ({minutes} minutes)
                            </p>
                            :
                            null
                    }
                </div>

                {
                    startedAt !== '' ?
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
                                mode === 'Work' && focusAtIndex === index ?
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
                                mode === 'Edit' ?
                                    <a
                                        className = 'break-item-remove-button'
                                        href = '/#'
                                        onClick = {onRemove}
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
}