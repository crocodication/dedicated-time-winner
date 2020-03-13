import React from 'react'


import moment from 'moment'


import './styles.css'


export default class extends React.Component {
    state = {
        minutes: 0,
        seconds: 0
    }

    progressStates = [
        {
            value: "💩 Not achieved at all",
            minimumMinutes: 0
        },
        {
            value: "🐌 Just making a progress",
            minimumMinutes: 5//this.props.spendMinutes / 2 < 10 ? 10 : Math.round(this.props.spendMinutes / 2)
        },
        {
            value: "🎯 Achieved",
            minimumMinutes: 5//this.props.spendMinutes - 10 < 10 ? 10 : Math.round(this.props.spendMinutes - 10)
        },
        {
            value: "💪🏻 More than achieved, bro!",
            minimumMinutes: 5//this.props.spendMinutes - 10 < 10 ? 10 : Math.round(this.props.spendMinutes - 10)
        }
    ]

    componentDidMount() {
        this.startTickingTheTimer()
    }

    render() {
        return (
            <div
                className = "counter-modal-background-container"
            >
                <div
                    className = "counter-modal-container"
                >
                    <h3
                        className = "counter-modal-title"
                    >
                        Let's go, get them!
                    </h3>

                    <h2
                        className = "counter-modal-task-name"
                    >
                        {this.props.currentTask}
                    </h2>

                    <p
                        className = "counter"
                    >
                        {this.toTickNumber(this.state.minutes)}:{this.toTickNumber(this.state.seconds)}
                    </p>

                    <div
                        className = "counter-choice-buttons-container"
                    >
                        {
                            this.progressStates.map(item => {
                                if(this.state.minutes >= item.minimumMinutes) {
                                    return (
                                        <a
                                            className = "counter-choice-button"
                                            href = '/v1/#'
                                            onClick = {() => this.markProgressAs(item)}
                                        >
                                            {item.value}
                                        </a>
                                    )
                                } else {
                                    return (
                                        <div
                                            className = "counter-choice-button"
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
                    </div>
                </div>
            </div>
        )
    }

    toTickNumber(number) {
        if(number < 10) {
            return "0" + number.toString()
        } else {
            return number.toString()
        }
    }

    startTickingTheTimer() {
        setTimeout(() => {
            const secondsGap = Math.floor((moment().toDate() - this.props.startTime.toDate()) / 1000)

            const seconds = secondsGap % 60
            const minutes = (secondsGap - seconds) / 60

            this.setState({
                minutes,
                seconds
            })
            
            this.startTickingTheTimer()
        }, 100)
    }

    markProgressAs(progressState) {
        this.props.sendProgress(progressState)
    }
}