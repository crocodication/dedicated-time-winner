import React from 'react'

import moment from 'moment'

const KEY_LOCAL_STORAGE_RUNNING_BREAK_PROGRESS = 'v2_running_break_progress'

export default class extends React.Component {
    state = {
        minutes: 0,
        seconds: 0,
        startTime: moment()
    }

    isCounting = true

    async componentDidMount() {
        const runningBreakProgress = await localStorage.getItem(KEY_LOCAL_STORAGE_RUNNING_BREAK_PROGRESS)

        if(runningBreakProgress !== null) {
            this.setState({startTime: moment(runningBreakProgress)})
        } else {
            localStorage.setItem(KEY_LOCAL_STORAGE_RUNNING_BREAK_PROGRESS, moment().toString())
        }

        this.startTickingTheTimer()
    }
    
    render() {
        const { state } = this
        const { minutes, seconds } = state

        return (
            <div
                className = 'break-counter-modal-background-container'
            >
                <div
                    className = 'break-counter-modal-container'
                >
                    <h3
                        className = 'break-counter-modal-title'
                    >
                        Breaking...
                    </h3>

                    <p
                        className = 'counter'
                        style = {{
                            color: 'white'
                        }}
                    >
                        {this.toTickNumber(minutes)}:{this.toTickNumber(seconds)}
                    </p>

                    <a
                        className = 'break-counter-button'
                        href = '/#'
                        onClick = {() => this.done()}
                        style = {{
                            backgroundColor: 'mediumseagreen'
                        }}
                    >
                        Done
                    </a>
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

    async done() {
        await localStorage.removeItem(KEY_LOCAL_STORAGE_RUNNING_BREAK_PROGRESS)

        const { props, state } = this
        const { startTime, minutes } = state

        props.sendBreakProgress(
            startTime.format('HH:mm'),
            minutes
        )
    }
}