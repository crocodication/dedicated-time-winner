const moment = require('moment')

export function CounterModal(props) {
    const React = require('react')
    const { useEffect, useState } = React

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [isBreaking, setIsBreaking] = useState(false)
    const [startTime, setStartTime] = useState(moment())

    const { currentTask, sendProgresses } = props

    const [progresses, setProgresses] = useState([])

    useEffect(() => {
        let isCounting = true

        function startTickingTheTimer() {
            const secondsGap = Math.floor((moment().toDate() - startTime.toDate()) / 1000)
        
            const seconds = secondsGap % 60
            const minutes = (secondsGap - seconds) / 60

            setMinutes(minutes)
            setSeconds(seconds)

            if(isCounting) {
                setTimeout(() => startTickingTheTimer(), 100)
            }
        }

        startTickingTheTimer()

        return () => {
            isCounting = false
        }
    }, [startTime, progresses])

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
                    {toTickNumber(minutes)}:{toTickNumber(seconds)}
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
                                        onClick = {() => markProgressAs(item)}
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
                        onClick = {() => setBreakOrContinue()}
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

    function toTickNumber(number) {
        if(number < 10) {
            return '0' + number.toString()
        } else {
            return number.toString()
        }
    }

    function markProgressAs(progressState) {
        const newProgresses = JSON.parse(JSON.stringify(progresses)).concat({
            startedAt: startTime.format('HH:mm'),
            minutes,
            emoji: progressState.value.split(' ')[0].trim(),
            type: 'productivity'
        })

        sendProgresses(newProgresses)
        setProgresses(newProgresses)
    }

    function setBreakOrContinue() {
        const newProgress = {
            startedAt: startTime.format('HH:mm'),
            minutes,
            emoji: ''
        }

        const newProgresses = JSON.parse(JSON.stringify(progresses))

        if(!isBreaking) {
            setProgresses(newProgresses.concat({
                ...newProgress,
                type: 'productivity'
            }))
        } else {
            setProgresses(newProgresses.concat({
                ...newProgress,
                type: 'break'
            }))
        }

        setMinutes(0)
        setSeconds(0)
        setIsBreaking(!isBreaking)
        setStartTime(moment())
    }
}