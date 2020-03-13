import React from 'react'

import './styles.css'

export default class extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    render() {
        const { props } = this

        const { data } = props

        return (
            <div
                className = "question-modal-background-container"
            >
                <div
                    className = "question-modal-dismiss-area-container"
                    onClick = {() => {
                        if(data.cancelable) {
                            props.data.onDismiss()
                        }
                    }}
                />

                <div
                    className = "question-modal-container"
                >
                    <div
                        className = "question-modal-title-container"
                    >
                        <h3
                            className = "question-modal-title"
                        >
                            {data.title}
                        </h3>

                        {
                            data.cancelable ?
                                <a
                                    className = "question-modal-close-button"
                                    href = '/v1/#'
                                    onClick = {props.data.onDismiss}
                                >
                                    X
                                </a>
                                :
                                null
                        }
                    </div>

                    <p
                        className = "question-modal-subtitle"
                    >
                        {data.subtitle}
                    </p>

                    {
                        data.answers.map(item => {
                            return (
                                <a
                                    className = "answer-container"
                                    href = '/v1/#'
                                    onClick = {() => props.data.answering(item)}
                                >
                                    <p
                                        className = "answer-emoji-text"
                                    >
                                        {item.value.split(" ")[0]}
                                    </p>

                                    <p
                                        className = "answer-text"
                                    >
                                        {this.getTextOfAnswer(item.value)}
                                    </p>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event) => {
        if(event.keyCode === 27 && this.props.data.cancelable) {
            setTimeout(() => this.props.data.onDismiss(), 100)
            
        }
    }

    getTextOfAnswer(value) {
        let text = ""

        const splittedText = value.split(" ")

        for(const textIndex in splittedText) {
            if(textIndex > 0) {
                text += splittedText[textIndex] + " "
            }
        }

        return text.trim()
    }
}