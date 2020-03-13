import React from 'react'


import './styles.css'


export default class extends React.Component {
    constructor(props) {
        super(props)

        this.handleActivityNameChange = this.handleActivityNameChange.bind(this)
        this.handleSpendMinutesChange = this.handleSpendMinutesChange.bind(this)
    }

    state = {
        name: this.props.task.name,
        spendMinutes: this.props.task.spendMinutes
    }

    handleActivityNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleSpendMinutesChange(event) {
        this.setState({spendMinutes: event.target.value})
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        return (
            <div
                className = "edit-modal-container"
            >
                <div
                    className = "edit-modal-background-container"
                    onClick = {this.props.onDismiss}
                />

                <div
                    className = "edit-modal-content-container"
                >
                    <div
                        className = "edit-modal-title-container"
                    >
                        <h3
                            className = "edit-modal-title"
                        >
                            Edit Task
                        </h3>

                        <a
                            className = "edit-modal-close-button"
                            href = '/v1/#'
                            onClick = {this.props.onDismiss}
                        >
                            X
                        </a>
                    </div>

                    <input
                        autoFocus
                        className = "input"
                        id = "project-name"
                        name = "project-name"
                        onChange = {this.handleActivityNameChange}
                        placeholder = "Activity name ..."
                        ref = {ref => this.nameInput = ref}
                        type = "text"
                        value = {this.state.name}
                    />
                    
                    <input
                        className = "input"
                        id = "project-name"
                        name = "project-name"
                        onChange = {this.handleSpendMinutesChange}
                        placeholder = "Spend minutes..."
                        ref = {ref => this.spendMinutesInput = ref}
                        type = "number"
                        value = {this.state.spendMinutes}
                    />

                    <a
                        className = "edit-submit-button"
                        href = '/v1/#'
                        onClick = {() => {
                            const { name, spendMinutes } = this.state

                            this.props.onSubmit({ name, spendMinutes })
                        }}
                    >
                        <p
                            className = "edit-submit-button-text"
                        >
                            Update
                        </p>
                    </a>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        if(event.keyCode === 27) {
            setTimeout(() => this.props.onDismiss(), 100)
        }
    }
}