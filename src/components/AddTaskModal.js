import React from 'react'

export default class extends React.Component {
    state = {
        activityName: '',
        taskName: ''
    }

    handleActivityNameChange = (event) => this.setState({activityName: event.target.value})
    handleTaskNameChange = (event) => this.setState({taskName: event.target.value})

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props, state } = this
        const { onDismiss, onAddTask } = props
        const { activityName, taskName } = state

        const isFormComplete = activityName.trim() !== '' && taskName.trim() !== ''

        return (
            <div
                className = 'add-task-modal-main-container'
            >
                <div
                    className = 'add-task-modal-background'
                    onClick = {onDismiss}
                />

                <div
                    className = 'add-task-modal-container'
                >
                    <div
                        className = 'add-task-modal-top-content-container'
                    >
                        <h2
                            className = 'add-task-modal-title'
                        >
                            Add Task
                        </h2>

                        <a
                            href = '/#'
                            onClick = {onDismiss}
                        >
                            <p
                                className = 'add-task-modal-close-button'
                            >
                                X
                            </p>
                        </a>
                    </div>

                    <input
                        autoFocus
                        className = "add-task-modal-input"
                        id = "activity-name"
                        name = "activity-name"
                        onChange = {this.handleActivityNameChange}
                        placeholder = 'Input activity name...'
                        type = "text"
                        value = {activityName}
                    />

                    <input
                        className = "add-task-modal-input"
                        id = "task-name"
                        name = "task-name"
                        onChange = {this.handleTaskNameChange}
                        placeholder = 'Input task name...'
                        type = "text"
                        value = {taskName}
                    />

                    {
                        !isFormComplete ?
                            <div
                                className = 'add-task-modal-add-button'
                                style = {{
                                    backgroundColor: 'dimgray'
                                }}
                            >
                                Add
                            </div>
                            :
                            <a
                                className = 'add-task-modal-add-button'
                                href = '/#'
                                onClick = {() => onAddTask(activityName, taskName)}
                                style = {{
                                    backgroundColor: 'mediumseagreen'
                                }}
                            >
                                Add
                            </a>
                    }
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        if(event.keyCode === 27) {
            setTimeout(this.props.onDismiss, 100)
        }
    }
}