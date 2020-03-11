import React from 'react'

import moment from 'moment'

export default class extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
        isBreaking: false,
        startTime: moment(),
        progresses: []
    }

    isCounting = true

    componentDidMount() {
        this.startTickingTheTimer()
    }
    
    render() {
        const { props, state } = this
        const { currentTask } = props
        const { minutes, seconds, isBreaking } = state

        return (
            <div
                className = 'counter-modal-background-container'
            >
                <div
                    className = 'counter-modal-container'
                    style = {{
                        backgroundColor: isBreaking ? 'darkslateblue' : 'white'
                    }}
                >
                    <h3
                        className = 'counter-modal-title'
                        style = {{
                            color: isBreaking ? 'white' : 'gray'
                        }}
                    >
                        {isBreaking ? 'Breaking...' : "Let's go, get them!"}
                    </h3>

                    <h2
                        className = 'counter-modal-task-name'
                    >
                        {currentTask}
                    </h2>

                    <p
                        className = 'counter'
                        style = {{
                            color: isBreaking ? 'white' : 'gray'
                        }}
                    >
                        {this.toTickNumber(minutes)}:{this.toTickNumber(seconds)}
                    </p>

                    <div
                        className = 'counter-choice-buttons-container'
                    >
                        {
                            [
                                {
                                    value: '💩 Not achieved at all',
                                    minimumMinutes: 0
                                },
                                {
                                    value: '🐌 Just making a progress',
                                    minimumMinutes: 3
                                },
                                {
                                    value: '🎯 Achieved',
                                    minimumMinutes: 3
                                },
                                {
                                    value: '💪🏻 More than achieved, bro!',
                                    minimumMinutes: 3
                                }
                            ].map(item => {
                                if(minutes >= item.minimumMinutes && !isBreaking) {
                                    return (
                                        <a
                                            className = 'counter-choice-button'
                                            href = '/#'
                                            onClick = {() => this.markProgressAs(item)}
                                        >
                                            {item.value}
                                        </a>
                                    )
                                } else {
                                    return (
                                        <div
                                            className = 'counter-choice-button'
                                            style = {{
                                                opacity: 0.3
                                            }}
                                        >
                                            {item.value}
                                        </div>
                                    )
                                }
                            })
                        }

                        <a
                            className = 'counter-break-button'
                            href = '/#'
                            onClick = {() => this.setBreakOrContinue()}
                            style = {{
                                backgroundColor: isBreaking ? 'mediumseagreen' : 'crimson'
                            }}
                        >
                            {isBreaking ? 'Continue' : 'Break'}
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.isCounting = false
    }

    startTickingTheTimer() {
        const secondsGap = Math.floor((moment().toDate() - this.state.startTime.toDate()) / 1000)
    
        const seconds = secondsGap % 60
        const minutes = (secondsGap - seconds) / 60

        this.setState({
            minutes,
            seconds
        })

        if(this.isCounting) {
            setTimeout(() => this.startTickingTheTimer(), 100)
        }
    }

    toTickNumber(number) {
        if(number < 10) {
            return '0' + number.toString()
        } else {
            return number.toString()
        }
    }

    markProgressAs(progressState) {
        const { props, state } = this
        const { minutes, progresses, startTime } = state

        const newProgresses = JSON.parse(JSON.stringify(progresses)).concat({
            startedAt: startTime.format('HH:mm'),
            minutes,
            emoji: progressState.value.split(' ')[0].trim(),
            type: 'productivity'
        })

        props.sendProgresses(newProgresses)

        this.setState({progresses: newProgresses})
    }

    setBreakOrContinue() {
        const { state } = this
        const { isBreaking, minutes, progresses, startTime } = state

        const newProgress = {
            startedAt: startTime.format('HH:mm'),
            minutes,
            emoji: ''
        }

        const newProgresses = JSON.parse(JSON.stringify(progresses))

        if(!isBreaking) {
            this.setState({progresses: newProgresses.concat({
                ...newProgress,
                type: 'productivity'
            })})
        } else {
            this.setState({progresses: newProgresses.concat({
                ...newProgress,
                type: 'break'
            })})
        }

        this.setState({
            isBreaking: !isBreaking,
            minutes: 0,
            seconds: 0,
            startTime: moment()
        })
    }
}