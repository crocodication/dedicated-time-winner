import React from 'react'


import { getInitial } from '../../helpers/Initial'


import Header from '../../comps/Header/index'
import Modal from '../../comps/Modal/index'


import Item from './comps/Item/index'
import PerformanceChart from './comps/PerformanceChart'

import './styles.css'
import moment from 'moment'


export default class extends React.Component {
    state = {
        isShowModal: false,
        pickedDateForTodayProgress: moment().format("YYYY-MM-DD")
    }

    componentDidMount() {
        this.addButton.focus()
    }

    render() {
        const { props } = this

        return (
            <div
                className = "home-container"
            >
                <div>
                    <Header
                        color = "#ebebeb"
                        title = "TimeBox Engager Web-App"
                        titleColor = "#243754"
                    />

                    <div
                        style = {{
                            bottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            height: 60,
                            justifyContent: "center",
                            position: "absolute",
                            right: 20,
                            top: 0
                        }}
                    >
                        <a
                            className = "add-button"
                            href = '/v1/#'
                            onClick = {() => this.setState({isShowModal: true})}
                            ref = {ref => this.addButton = ref}
                        >
                            <p>
                                +
                            </p>
                        </a>
                    </div>
                </div>

                <div
                    style = {{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <div
                        style = {{
                            backgroundColor: "gray",
                            marginTop: 20,
                            marginLeft: 20,
                            marginRight: 20,
                            padding: 10
                        }}
                    >
                        <h3
                            style = {{
                                color: "white",
                                lineHeight: 1.5,
                                opacity: 0.7
                            }}
                        >
                            | Everybody Loves To Be A Winner, Why Shouldn't You?
                        </h3>

                        <h3
                            style = {{
                                color: "white",
                                lineHeight: 1.5,
                                marginTop: 5,
                                opacity: 0.7
                            }}
                        >
                            | Start Small, Win Your Few TimeBox Cycles Today
                        </h3>
                    </div>
                </div>

                {
                    props.activities.length === 0 ?
                        <div
                            className = "empty-state-container"
                        >
                            <h3
                                className = "empty-state-text"
                            >
                                You have no activities here...
                            </h3>

                            <h3
                                className = "empty-state-text"
                            >
                                To create one, click '+' button on the top right
                            </h3>
                        </div>
                        :
                        <div>
                            <h2
                                style = {{
                                    color: "gray",
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginTop: 20
                                }}
                            >
                                📒 Your activities
                            </h2>                   

                            <div
                                style = {{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 20
                                }}
                            >
                                {
                                    props.activities.map((item, index) => {
                                        return (
                                            <Item
                                                isUseMarginRight = {index === props.activities.length}
                                                item = {item}
                                                key = {item.name}
                                                ref = {ref => this["item-" + index.toString()] = ref}
                                                seeItem = {() => props.setCurrentViewingActivityIndex(index)}
                                            />
                                        )
                                    })
                                }
                            </div>

                            <div
                                style = {{
                                    marginBottom: 20,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}
                            >
                                <h2
                                    style = {{
                                        color: "gray",
                                        marginBottom: 20
                                    }}
                                >
                                    🎯💪🏻 This week's wins performance
                                </h2>
                                
                                <PerformanceChart
                                    activities = {props.activities}
                                    selectDate = {pickedDateForTodayProgress => this.setState({pickedDateForTodayProgress})}
                                />   
                            </div>

                            <div
                                style = {{
                                    marginBottom: 20,
                                    marginLeft: 20,
                                    marginRight: 20
                                }}
                            >
                                <h2
                                    className = "progresses"
                                    style = {{
                                        color: "gray"
                                    }}
                                >
                                    🕗 Progresses on {moment(this.state.pickedDateForTodayProgress).format("dddd, D MMMM YYYY")}
                                </h2>

                                <div
                                    style = {{
                                        borderRadius: 7,
                                        marginTop: 20,
                                        overflow: "hidden"
                                    }}
                                >
                                    {
                                        this.getTodayProgresses(this.state.pickedDateForTodayProgress).length == 0 ?
                                            <h3
                                                className = "empty-state-text"
                                                style = {{
                                                    color: "darkgray",
                                                    marginBottom: 20,
                                                    marginTop: 20
                                                }}
                                            >
                                                No data available here...
                                            </h3>
                                            :
                                            this.getTodayProgresses(this.state.pickedDateForTodayProgress).map(item => {
                                                return (
                                                    <div
                                                        style = {{
                                                            alignItems: "center",
                                                            backgroundColor: "white",
                                                            display: "flex",
                                                            padding: 20
                                                        }}
                                                    >
                                                        <div
                                                            style = {{
                                                                alignItems: "center",
                                                                display: "flex",
                                                                flex: 1
                                                            }}
                                                        >
                                                            <div
                                                                style = {{
                                                                    backgroundColor: item.color,
                                                                    borderRadius: 7,
                                                                    height: 25,
                                                                    marginRight: 10,
                                                                    width: 25
                                                                }}
                                                            />
    
                                                            <div
                                                                style = {{
                                                                    flex: 1
                                                                }}
                                                            >
                                                                <p
                                                                    style = {{
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    {item.activityName}
                                                                </p>
    
                                                                <p
                                                                    style = {{
                                                                        fontSize: 20,
                                                                        fontWeight: "bold",
                                                                        marginTop: 5
                                                                    }}
                                                                >
                                                                    {item.taskName}
                                                                </p>
    
                                                                <p
                                                                    style = {{
                                                                        color: "gray",
                                                                        marginTop: 5
                                                                    }}
                                                                >
                                                                    {item.time.start} - {item.time.end} ({item.time.minutes} mins)
                                                                </p>
                                                            </div>
                                                        </div>
    
                                                        <p
                                                            style = {{
                                                                fontSize: 36,
                                                                marginRight: 10
                                                            }}
                                                        >
                                                            {item.progress}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                }

                {
                    this.state.isShowModal ?
                        <Modal
                            inputPlaceholder = "Enter activity name..."
                            onDismiss = {() => this.setState({isShowModal: false})}
                            onSubmit = {activityName => {
                                if(getInitial(activityName) !== "") {
                                    props.addActivity(activityName)
                                } else {
                                    alert("Please input a proper activity name")

                                    setTimeout(() => this.setState({isShowModal: true}), 500)
                                }
                            }}
                            title = "Create New Activity"
                        />
                        :
                        null
                }
            </div>
        )
    }

    getTodayProgresses(date) {
        const todayProgresses = []

        for(const activity of this.props.activities) {
            for(const task of activity.tasks) {
                for(const effort of task.efforts) {
                    if(effort.date === date) {
                        for(const item of effort.items) {
                            todayProgresses.unshift({
                                color: activity.color,
                                activityName: activity.name,
                                taskName: task.name,
                                time: item.time,
                                progress: item.progress
                            })
                        }
                    }
                }
            }
        }

        todayProgresses.sort((a,b) => (a.time.start < b.time.start) ? 1 : ((b.time.start < a.time.start) ? -1 : 0))

        return todayProgresses
    }
}