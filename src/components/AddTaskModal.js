export function AddTaskModal(props) {
    const React = require('react')
    const { useEffect, useState } = React

    const [activityName, setActivityName] = useState('')
    const [taskName, setTaskName] = useState('')

    const handleActivityNameChange = (event) => setActivityName(event.target.value)
    const handleTaskNameChange = (event) => setTaskName(event.target.value)

    const { onDismiss, onAddTask } = props

    useEffect(() => {
        const onKeyDown = (event) => {
            if(event.keyCode === 27) {
                setTimeout(onDismiss, 100)
            }
        }

        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onDismiss])

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
                    onChange = {handleActivityNameChange}
                    placeholder = 'Input activity name...'
                    type = "text"
                    value = {activityName}
                />

                <input
                    className = "add-task-modal-input"
                    id = "task-name"
                    name = "task-name"
                    onChange = {handleTaskNameChange}
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