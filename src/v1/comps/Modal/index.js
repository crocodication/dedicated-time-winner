import React from 'react'


import './styles.css'


export default class extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        inputValue: ""
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value})
    }

    componentDidMount() {
        this.input.focus()

        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props } = this

        return (
            <div
                style = {{
                    alignItems: "center",
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    left: 0,
                    position: "fixed",
                    right: 0,
                    top: 0
                }}
            >
                <div
                    onClick = {props.onDismiss}
                    style = {{
                        backgroundColor: "rgba(0,0,0,0.75)",
                        bottom: 0,
                        left: 0,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        zIndex: -1
                    }}
                />

                <div
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 7,
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                        justifyContent: "space-between",
                        padding: 20,
                        width: 300
                    }}
                >
                    <div>
                        <div
                            style = {{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <h3
                                className = "title"
                            >
                                {props.title}
                            </h3>

                            <a
                                className = "close-button"
                                href = '/v1/#'
                                onClick = {props.onDismiss}
                            >
                                X
                            </a>
                        </div>

                        <input
                            autoFocus
                            className = "input"
                            id = "project-name"
                            name = "project-name"
                            onChange = {this.handleChange}
                            onKeyDown = {event => {
                                if (event.key === 'Enter') {
                                    this.createButton.focus()
                                }
                              }}
                            placeholder = {this.props.inputPlaceholder}
                            ref = {ref => this.input = ref}
                            type = "text"
                            value = {this.state.inputValue}
                        />
                    </div>

                    <a
                        className = "submit-button"
                        href = '/v1/#'
                        onClick = {() => {
                            this.props.onSubmit(this.state.inputValue.trim())

                            this.props.onDismiss()
                        }}
                        ref = {ref => this.createButton = ref}
                    >
                        <p
                            className = "submit-button-text"
                        >
                            Create
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

