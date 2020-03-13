import React from 'react'

import Emoji from '../components/Emoji'

export default class extends React.Component {
    render() {
        const { props } = this
        const { focusAtIndex, index, item, mode, onRemove, onStart } = props
        const { minutes, startedAt } = item

        return (
            <div
                className = {mode === 'View Edit' ? 'break-item-container-edit-mode' : 'break-item-container-main-mode'}
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
                                mode === 'Main' && focusAtIndex === index ?
                                    <a
                                        className = 'break-item-start-button'
                                        href = '/v2/#'
                                        onClick = {onStart}
                                    >
                                        Start
                                    </a>
                                    :
                                    null
                            }

                            {
                                mode === 'View Edit' ?
                                    <a
                                        className = 'break-item-remove-button'
                                        href = '/v2/#'
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