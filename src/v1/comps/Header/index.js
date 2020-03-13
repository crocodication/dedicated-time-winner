import React from 'react'


import './styles.css'


export default class extends React.Component {
    render() {
        const { props } = this

        return (
            <div
                className = "container"
                style = {{
                    backgroundColor: props.color
                }}    
            >
                <h2
                    style = {{
                        color: props.titleColor
                    }}
                >
                    {props.title}
                </h2>
            </div>
        )
    }
}