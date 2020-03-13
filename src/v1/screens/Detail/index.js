import React from 'react'


import moment from 'moment'


import Header from '../../comps/Header/index'
import Modal from '../../comps/Modal/index'


import './styles.css'

import CounterModal from './comps/CounterModal'
import EditModal from './comps/EditModal'
import QuestionModal from './comps/QuestionModal'
import Task from './comps/Task'


export default class extends React.Component {
    state = {
        isShowCounterModal: false,
        isShowEditModal: false,
        isShowModal: false,
        isShowQuestionModal: false,
        questionModalData: undefined
    }

    selectedTaskIndex = undefined

    currentTaskData = undefined

    questionModalDataPreparation = {
        title: "Rate Yourself",
        subtitle: "Before you get started, how do you describe your preparation for this cycle?",
        answers: [
            { value: "💩 Nope, not so good enough" },
            { value: "👌 Well prepared", },
            { value: "💪🏻 Feel passionate, bro!" }
        ],
        cancelable: true,
        onDismiss: () => {
            this.selectedTaskIndex = undefined

            this.setState({isShowQuestionModal: false})
        },
        answering: answer => {
            this.currentTaskData = {
                preparation: answer.value.split(" ")[0],
                time: {
                    start: moment()
                }
            }

            localStorage.setItem("ongoingProgress", JSON.stringify({
                activityName: this.props.activity.name,
                taskName: this.props.activity.tasks[this.selectedTaskIndex].name,
                preparation: answer.value.split(" ")[0],
                startedFrom: moment().toString()
            }))

            this.setState({
                isShowCounterModal: true,
                isShowQuestionModal: false
            })
        }
    }

    questionModalDataRightDecision = {
        title: "Rate Yourself",
        subtitle: "Do you think you are right allocating this 90 minutes on this task?",
        answers: [
            { value: "❌ No, I should do the other" },
            { value: "✅ Yes" }
        ],
        cancelable: false,
        answering: answer => {
            this.currentTaskData = {
                ...this.currentTaskData,
                decision: answer.value.split(" ")[0]
            }

            this.setState({questionModalData: this.questionModalDataSelfFeelAfterCycle})
        }
    }

    questionModalDataSelfFeelAfterCycle = {
        title: "Rate Yourself",
        subtitle: "What do you feel after doing that task?",
        answers: [
            { value: "😬 I don't want to say how it was" },
            { value: "😌 Relieved" },
            { value: "💪🏻 Stronger passion, bro!" }
        ],
        cancelable: false,
        answering: answer => {
            this.setState({isShowQuestionModal: false})

            const currentTaskData = {
                ...this.currentTaskData,
                selfImpact: answer.value.split(" ")[0]
            }

            this.currentTaskData = undefined

            const secondsGap = Math.floor((currentTaskData.time.end.toDate() - currentTaskData.time.start.toDate()) / 1000)

            const minutesGap = (secondsGap - (secondsGap % 60)) / 60

            this.props.addEffort(this.selectedTaskIndex, {
                ...currentTaskData,
                time: {
                    minutes: minutesGap,
                    start: currentTaskData.time.start.format("HH:mm"),
                    end: currentTaskData.time.end.format("HH:mm")
                }
            })

            this.selectedTaskIndex = 0
        },
    }

    componentDidMount() {
        this.addNewTaskButton.focus()

        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props } = this

        const { activity } = props

        return (
            <div>
                <div>
                    <Header
                        color = {activity.color}
                        title = {activity.name}
                        titleColor = "#ebebeb"
                    />

                    <div
                        style = {{
                            alignItems: "center",
                            height: 60,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            position: "absolute",
                            top: 0,
                            right: 20,
                            bottom: 0
                        }}
                    >
                        <a
                            className = "add-task-container"
                            href = '/v1/#'
                            onClick = {() => this.setState({isShowModal: true})}
                            ref = {ref => this.addNewTaskButton = ref}
                            style = {{
                                color: activity.color
                            }}
                        >
                            Add New Task
                        </a>

                        <a
                            className = "back-button"
                            href = '/v1/#'
                            onClick = {props.back}
                        >
                            <p>
                                X
                            </p>
                        </a>
                    </div>
                </div>

                <div className = "content-container">
                    {
                        activity.tasks.map((item, index) => {
                            return (
                                <Task
                                    activity = {activity}
                                    item = {item}
                                    index = {index}
                                    key = {JSON.stringify(item.name)}
                                    onEdit = {() => {
                                        this.selectedTaskIndex = index

                                        this.setState({isShowEditModal: true})
                                    }}
                                    ref = {ref => this["task-" + index.toString()] = ref}
                                    startTask = {() => {
                                        this.selectedTaskIndex = index

                                        this.setState({
                                            isShowQuestionModal: true,
                                            questionModalData: this.questionModalDataPreparation
                                        })
                                    }}
                                />
                            )
                        })
                    }
                </div>

                {
                    this.state.isShowModal ?
                        <Modal
                            inputPlaceholder = "Enter task name..."
                            onDismiss = {() => this.setState({isShowModal: false})}
                            onSubmit = {async (taskName) => {
                                if(taskName.trim() !== "") {
                                    await this.props.addTask(taskName)
                                    
                                    this["task-0"].startTaskButton.focus()
                                } else {
                                    alert("Please input the task name")

                                    setTimeout(() => this.setState({isShowModal: true}), 500)
                                }
                            }}
                            title = "Create New Task"
                        />
                        :
                        null
                }

                {
                    this.state.isShowQuestionModal ?
                        <QuestionModal
                            data = {this.state.questionModalData}
                        />
                        :
                        null
                }

                {
                    this.state.isShowCounterModal ?
                        <CounterModal
                            currentTask = {activity.tasks[this.selectedTaskIndex].name}
                            sendProgress = {async(progressState) => {
                                this.currentTaskData = {
                                    ...this.currentTaskData,
                                    progress: progressState.value.split(" ")[0],
                                    time: {
                                        ...this.currentTaskData.time,
                                        end: moment()
                                    }
                                }

                                await this.setState({
                                    isShowCounterModal: false,
                                    isShowQuestionModal: true,
                                    questionModalData: this.questionModalDataRightDecision
                                })

                                localStorage.removeItem("ongoingProgress")
                            }}
                            spendMinutes = {activity.tasks[this.selectedTaskIndex].spendMinutes}
                            startTime = {this.currentTaskData.time.start}
                        />
                        :
                        null
                }

                {
                    this.state.isShowEditModal ?
                        <EditModal
                            onDismiss = {() => {
                                this.selectedTaskIndex = undefined

                                this.setState({isShowEditModal: false})
                            }}
                            task = {activity.tasks[this.selectedTaskIndex]}
                            onSubmit = {newTaskData => {
                                if(newTaskData.name.trim() === "") {
                                    alert("Please input the task name")
                                } else if(newTaskData.spendMinutes < 5 || newTaskData.spendMinutes > 90) {
                                    alert("Please input the spend minutes between 5 to 90 minutes")
                                } else {
                                    this.setState({isShowEditModal: false})

                                    this.props.updateTask(this.selectedTaskIndex, newTaskData)

                                    this.selectedTaskIndex = undefined
                                }
                            }}
                        />
                        :
                        null
                }
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        const { state } = this

        const isModalShowing = state.isShowModal || state.isShowQuestionModal || state.isShowCounterModal || state.isShowEditModal

        if(event.keyCode === 27 && !isModalShowing) {
            setTimeout(() => this.props.back(), 100)
        }
    }

    setShowCounterModalFromContainer(data) {
        this.currentTaskData = {
            preparation: data.preparation,
            time: {
                start: moment(data.startedFrom)
            }
        }

        for(const taskIndex in this.props.activity.tasks) {
            if(this.props.activity.tasks[taskIndex].name === data.taskName) {
                this.selectedTaskIndex = taskIndex

                break
            }
        }

        this.setState({isShowCounterModal: true})
    }
}