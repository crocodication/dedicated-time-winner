import React from 'react';

import moment from 'moment';
import { Helmet } from "react-helmet";

import Home from './screens/Home/index'
import Detail from './screens/Detail/index'

import { getRandomColor } from './refs/colors'

import { Redirect } from 'react-router-dom'

export default class App extends React.Component {
    state = {
        activities: [],
        currentViewingActivityIndex: undefined //0
    }

    async componentDidMount() {
        const activitiesStringJSON = await localStorage.getItem('activities')

        if(activitiesStringJSON != null) {
            const activities = JSON.parse(activitiesStringJSON)

            await this.setState({activities})

            const ongoingProgressStringJSON = await localStorage.getItem('ongoingProgress')

            if(ongoingProgressStringJSON != null) {
                const ongoingProgress = JSON.parse(ongoingProgressStringJSON)
                
                for(const activityIndex in activities) {
                    if(ongoingProgress.activityName === activities[activityIndex].name) {
                        await this.setState({currentViewingActivityIndex: activityIndex})

                        this.detailScreen.setShowCounterModalFromContainer(ongoingProgress)

                        break
                    }
                }
            }
        }
    }

    render() {
        require('./styles.css')

        const { state } = this

        const { activities } = state

        if(state.currentViewingActivityIndex === undefined) {
            return (
                <div
                    style = {{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column"
                    }}
                >
                    <Helmet>
                        <meta charSet="utf-8" />
                        
                        <title>Timeboxing Engager App</title>
                    </Helmet>

                    <Home
                        activities = {activities}
                        addActivity = {this.addActivity}
                        ref = {ref => this.homeScreen = ref}
                        setCurrentViewingActivityIndex = {currentViewingActivityIndex => this.setState({currentViewingActivityIndex})}
                    />

                    <Redirect
                        to = "/v1/#"
                    />
                </div>
            )
        } else {
            return (
                <div
                    style = {{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column"
                    }}
                >
                    <Helmet>
                        <meta charSet="utf-8" />

                        <title>{activities[state.currentViewingActivityIndex].name}</title>
                    </Helmet>

                    <Detail
                        activity = {activities[state.currentViewingActivityIndex]}
                        addEffort = {this.addEffort}
                        addTask = {this.addTask}
                        back = {() => this.setState({currentViewingActivityIndex: undefined})}
                        ref = {ref => this.detailScreen = ref}
                        updateTask = {this.updateTask}
                    />

                    <Redirect
                        to = "/v1/#"
                    />
                </div>
            )
        }
    }

    addActivity = async(activityName) => {
        const activities = JSON.parse(JSON.stringify(this.state.activities))

        activities.unshift({
            color: getRandomColor(),
            name: activityName,
            tasks: []
        })

        await localStorage.setItem('activities', JSON.stringify(activities))

        await this.setState({activities})
        
        this.homeScreen["item-" + (this.state.activities.length - 1).toString()].button.focus()
    }

    addTask = async(taskName) => {
        const activities = JSON.parse(JSON.stringify(this.state.activities))

        activities[this.state.currentViewingActivityIndex].tasks.unshift({
            name: taskName,
            spendMinutes: 90,
            efforts: []
        })

        await localStorage.setItem('activities', JSON.stringify(activities))

        await this.setState({activities})
    }

    addEffort = async(taskIndex, effort) => {
        const { state } = this

        const activities = JSON.parse(JSON.stringify(state.activities))

        let foundSameDate = false

        for(const recentEffort of activities[state.currentViewingActivityIndex].tasks[taskIndex].efforts) {
            if(recentEffort.date === moment().format("YYYY-MM-DD")) {
                recentEffort.items.unshift(effort)

                foundSameDate = true
            }
        }

        if(!foundSameDate) {
            activities[state.currentViewingActivityIndex].tasks[taskIndex].efforts.unshift({
                date: moment().format("YYYY-MM-DD"),
                items: [].concat(effort)
            })
        }

        activities[state.currentViewingActivityIndex].tasks.unshift(activities[state.currentViewingActivityIndex].tasks.splice(taskIndex, 1)[0])
        
        activities.unshift(activities.splice(state.currentViewingActivityIndex, 1)[0])

        await localStorage.setItem('activities', JSON.stringify(activities))

        await this.setState({
            currentViewingActivityIndex: 0,
            activities
        })
    }

    updateTask = async(taskIndex, newTaskData) => {
        const { state } = this

        const activities = JSON.parse(JSON.stringify(state.activities))

        activities[state.currentViewingActivityIndex].tasks[taskIndex] = {
            ...activities[state.currentViewingActivityIndex].tasks[taskIndex],
            ...newTaskData
        }

        await localStorage.setItem('activities', JSON.stringify(activities))

        await this.setState({activities})
    }
}