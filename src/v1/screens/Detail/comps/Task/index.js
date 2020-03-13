import React from 'react'


import moment from 'moment'


import editIcon from '../../../../icons/edit.png'


import './styles.css'


export default class extends React.Component {
    state = {
        showEfforts: false //true 
    }

    render() {
        const { props } = this

        const { activity, item, index } = props

        return (
            <div
                style = {{
                    marginBottom: index !== activity.tasks.length - 1 ? 20 : 0
                }}
            >
                <div
                    className = "task-container"
                    key = {item}
                    style = {{
                        borderBottomLeftRadius: item.efforts.length === 0 ? 7 : 0,
                        borderBottomRightRadius: item.efforts.length === 0 ? 7 : 0
                    }}
                >
                    <p
                        style = {{
                            flex: 1,
                            fontWeight: "bold"
                        }}
                    >
                        {item.name}
                    </p>

                    <div
                        style = {{
                            alignItems: "center",
                            display: "flex"
                        }}
                    >
                        <a
                            className = "start-task-button"
                            href = '/v1/#'
                            onClick = {() => {
                                this.setState({showEfforts: true})

                                props.startTask()
                            }}
                            ref = {ref => this.startTaskButton = ref}
                        >
                            Start Task {"~ " + item.spendMinutes + "mins"}
                        </a>

                        <a
                            href = '/v1/#'
                            onClick = {props.onEdit}
                            style = {{
                                marginLeft: 20
                            }}
                        >
                            <img
                                src = {editIcon}
                                style = {{
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </a>
                    </div>
                </div>

                {
                    this.state.showEfforts ?
                        <div>
                            {
                                item.efforts.map(itemItem => {
                                    return (
                                        <>
                                            <p
                                                class = "task-effort-date"
                                                style = {{
                                                    backgroundColor: activity.color
                                                }}
                                            >
                                                {moment(itemItem.date).format("dddd, D MMMM YYYY")}
                                            </p>

                                            {
                                                itemItem.items.map((effortItem, effortIndex) => {
                                                    return  (
                                                        <div
                                                            className = "task-effort-container"
                                                        >
                                                            <p
                                                                style = {{
                                                                    color: "white"
                                                                }}
                                                            >
                                                                {effortItem.time.start} - {effortItem.time.end} ({effortItem.time.minutes}mins)
                                                            </p>
                        
                                                            <div
                                                                className = "task-effort-detail-container"
                                                            >
                                                                <div
                                                                    className = "task-effort-detail"
                                                                >
                                                                    <p
                                                                        style = {{
                                                                            color: "white",
                                                                            fontSize: 10,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        Preparation
                                                                    </p>
                        
                                                                    <p
                                                                        className = "task-effort-icon"
                                                                    >
                                                                        {effortItem.preparation}
                                                                    </p>
                                                                </div>
                        
                                                                <div
                                                                    className = "task-effort-detail"
                                                                >
                                                                    <p
                                                                        style = {{
                                                                            color: "white",
                                                                            fontSize: 10,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        Progress
                                                                    </p>
                        
                                                                    <p
                                                                        className = "task-effort-icon"
                                                                    >
                                                                        {effortItem.progress}
                                                                    </p>
                                                                </div>
                        
                                                                <div
                                                                    className = "task-effort-detail"
                                                                >
                                                                    <p
                                                                        style = {{
                                                                            color: "white",
                                                                            fontSize: 10,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        Decision
                                                                    </p>
                        
                                                                    <p
                                                                        className = "task-effort-icon"
                                                                    >
                                                                        {effortItem.decision}
                                                                    </p>
                                                                </div>
                        
                                                                <div
                                                                    className = "task-effort-detail"
                                                                >
                                                                    <p
                                                                        style = {{
                                                                            color: "white",
                                                                            fontSize: 10,
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        Self-Impact
                                                                    </p>
                        
                                                                    <p
                                                                        className = "task-effort-icon"
                                                                    >
                                                                        {effortItem.selfImpact}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                }

                {
                    item.efforts.length > 0 ?
                        <div
                            class = "see-efforts-data-container"
                            style = {{
                                backgroundColor: activity.color
                            }}
                        >
                            <a
                                class = "see-efforts-data-button-text"
                                href = '/v1/#'
                                onClick = {() => this.setState({showEfforts: !this.state.showEfforts})}
                            >
                                {this.state.showEfforts ? "See Less" : "See More"}
                            </a>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}