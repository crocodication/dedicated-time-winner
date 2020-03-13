import React from 'react'

import Emoji from '../components/Emoji'

export default class extends React.Component {
    render() {
        const { props } = this
        const { focusAtIndex, index, item, mode, onRemove, onStart } = props
        const { activityName, emoji, startedAt, minutes, taskName } = item

        return (
            <div
                className = {mode === 'View Edit' ? 'productivity-item-container-edit-mode' : 'productivity-item-container-main-mode'}
                style = {{
                    backgroundColor: focusAtIndex === index ? 'mediumseagreen' : 'white'
                }}
            >
                <div
                    className = 'productivity-item-top-details-container'
                >
                    <div>
                        <p
                            className = 'productivity-item-activity-name'
                            style = {{
                                color: focusAtIndex === index ? 'white' : 'gray'
                            }}
                        >
                            {activityName}
                        </p>

                        <p
                            className = 'productivity-item-task-name'
                        >
                            {taskName}
                        </p>

                        {
                            startedAt !== '' ?
                                <p
                                    className = 'productivity-item-started-at-and-minutes'
                                >
                                    Started at {startedAt} ({minutes} minutes)
                                </p>
                                :
                                null
                        }
                    </div>
                    
                    {
                        startedAt !== '' ?
                            (
                                emoji !== '' ?
                                    <div
                                        className = 'productivity-item-emoji-background'
                                    >
                                        <p
                                            className = 'productivity-item-emoji'
                                        >
                                            <Emoji
                                                symbol = {emoji}
                                            />
                                        </p>
                                    </div>
                                    :
                                    null
                            )
                            :
                            <div
                                className = 'productivity-item-options-container'
                            >
                                {
                                    mode === 'Main' && focusAtIndex === index ?
                                        <a
                                            className = 'productivity-item-start-button'
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
                                            className = 'productivity-item-remove-button'
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

                {/* {
                    startedAt !== '' ?
                        <div
                            className = 'productivity-item-efforts-container'
                        >
                            <div
                                className = 'productivity-item-efforts-top-container'
                            >
                                <p
                                    className = 'productivity-item-efforts-title-text'
                                >
                                    Efforts
                                </p>
                            </div>

                            <div
                                className = 'productivity-item-efforts-bottom-container'
                            >
                                {
                                    efforts.map((effortItem, effortIndex) => {
                                        const { minutes, type } = effortItem

                                        return (
                                            <div
                                                className = 'productivity-item-effort-container'
                                                key = {JSON.stringify(effortItem)}
                                                style = {{
                                                    marginTop: effortIndex === 0 ? 0 : 20
                                                }}
                                            >
                                                <p
                                                    className = 'productivity-item-effort-text'
                                                >
                                                    {minutes} minutes {type}
                                                </p>

                                                <div
                                                    className = 'productivity-item-effort-emoji-container'
                                                    style = {{
                                                        backgroundColor: type === 'productive' ? 'steelblue' : 'gainsboro'
                                                    }}
                                                >
                                                    <p
                                                        className = 'productivity-item-effort-emoji'
                                                    >
                                                        <Emoji
                                                            symbol = {type === 'productive' ? '💻' : '💤'}
                                                        />
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                } */}
            </div>
        )
    }
}