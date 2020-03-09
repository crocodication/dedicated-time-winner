export function ProductivityItem(props) {
    const React = require('react')

    const { Emoji } = require('../components/Emoji')

    const { item } = props

    return (
        <div
            className = 'productivity-item-container'
            style = {{
                backgroundColor: props.focusAtIndex === props.index ? 'mediumseagreen' : 'white',
                opacity: props.mode === 'Work' && props.focusAtIndex !== null && props.focusAtIndex !== props.index ? 0.2 : 1
            }}
        >
            <div
                className = 'productivity-item-top-details-container'
            >
                <div>
                    <p
                        className = 'productivity-item-activity-name'
                        style = {{
                            color: props.focusAtIndex === props.index ? 'white' : 'gray'
                        }}
                    >
                        {item.activityName}
                    </p>

                    <p
                        className = 'productivity-item-task-name'
                    >
                        {item.taskName}
                    </p>

                    {
                        item.startedAt !== '' ?
                            <p
                                className = 'productivity-item-started-at-and-minutes'
                            >
                                Started at {item.startedAt} ({getEffortsMinutes()} minutes)
                            </p>
                            :
                            null
                    }
                </div>
                
                {
                    item.startedAt !== '' ?
                        <div
                            className = 'productivity-item-emoji-background'
                        >
                            <p
                                className = 'productivity-item-emoji'
                            >
                                <Emoji
                                    symbol = {item.emoji}
                                />
                            </p>
                        </div>
                        :
                        <div
                            className = 'productivity-item-options-container'
                        >
                            {
                                props.mode === 'Work' && props.focusAtIndex === props.index ?
                                    <a
                                        className = 'productivity-item-start-button'
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
                                        className = 'productivity-item-remove-button'
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

            {
                item.startedAt !== '' ?
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
                                item.efforts.map((effortItem, effortIndex) => {
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
                                                {effortItem.minutes} minutes {effortItem.type}
                                            </p>

                                            <div
                                                className = 'productivity-item-effort-emoji-container'
                                                style = {{
                                                    backgroundColor: effortItem.type === 'productive' ? 'steelblue' : 'gainsboro'
                                                }}
                                            >
                                                <p
                                                    className = 'productivity-item-effort-emoji'
                                                >
                                                    <Emoji
                                                        symbol = {effortItem.type === 'productive' ? '💻' : '💤'}
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
            }
        </div>
    )

    function getEffortsMinutes() {
        let minutes = 0

        for(const effort of props.item.efforts) {
            minutes += effort.minutes
        }

        return minutes
    }
}