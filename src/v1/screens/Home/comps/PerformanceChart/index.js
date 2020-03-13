import React from 'react'

import moment from 'moment'

export default class extends React.Component {
    state = {
        data: [],
        maxSpendMinutes: 360
    }

    async componentDidMount() {
        await this.loadData()
        
        this.calculateMaxSpendTime()
    }

    render() {
        const chartHeight = 400

        return (
            <div
                style = {{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <div
                    style = {{
                        backgroundColor: "white",
                        borderRadius: 7,
                        display: "flex",
                        minWidth: 250,
                        padding: 20
                    }}
                >
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <div
                                    style = {{
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: index == 0 ? 0 : 10
                                    }}
                                >
                                    <a
                                        href = "#progresses"
                                        onClick = {() => this.props.selectDate(moment(item.date).format("YYYY-MM-DD"))}
                                    >
                                        <p
                                            style = {{
                                                color: "black",
                                                fontSize: 12
                                            }}
                                        >
                                            {moment(item.date).format("DD/MM")}
                                        </p>
                                    </a>

                                    <div
                                        style = {{
                                            alignItems: "flex-end",
                                            display: "flex",
                                            marginTop: 10,
                                            minHeight: chartHeight
                                        }}
                                    >
                                        <div
                                            style = {{
                                                display: "flex",
                                                flexDirection: "column-reverse",
                                                height: this.getTotalThisDateDataValue(item) / this.state.maxSpendMinutes * chartHeight,
                                                width: 30
                                            }}
                                        >
                                            {
                                                item.values.map(valueItem => {
                                                    return (
                                                        <a
                                                            href = "#progresses"
                                                            onClick = {() => {
                                                                this.props.selectDate(moment(item.date).format("YYYY-MM-DD"))

                                                                setTimeout(() => alert(valueItem.activityName + " (" + valueItem.spendMinutes + " mins)" + "\n\n" + valueItem.taskName + "\nProgress: " + valueItem.progress), 100)
                                                            }}
                                                            style = {{
                                                                alignItems: "center",
                                                                backgroundColor: valueItem.color,
                                                                border: "2px dotted black",
                                                                color: "white",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                fontSize: 12,
                                                                fontWeight: "bold",
                                                                flex: valueItem.spendMinutes,
                                                                justifyContent: "center",
                                                                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                                                            }}
                                                        >
                                                            <p>
                                                                {valueItem.spendMinutes}
                                                            </p>
                                                            
                                                            <p>
                                                                {valueItem.progress}
                                                            </p>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    async loadData() {
        const data = []

        for(const activity of this.props.activities) {
            for(const task of activity.tasks) {
                for(const effort of task.efforts) {
                    let foundSameDateInIndex = -1

                    for(const dataIndex in data) {
                        if(data[dataIndex].date === effort.date) {
                            foundSameDateInIndex = dataIndex

                            break
                        }
                    }

                    const items = []

                    for(const item of effort.items) {
                        if(item.progress === "🎯" || item.progress === "💪🏻") {
                            items.push({
                                color: activity.color,
                                start: item.time.start,
                                spendMinutes: item.time.minutes,
                                activityName: activity.name,
                                taskName: task.name,
                                progress: item.progress
                            })
                        }
                    }

                    if(items.length > 0) {
                        if(foundSameDateInIndex === -1) {
                            data.push({
                                date: effort.date,
                                values: items.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))
                            })
                        } else {
                            data[foundSameDateInIndex].values = data[foundSameDateInIndex].values.concat(items).sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))
                        }
                    }
                }
            }
        }

        data.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))

        const dataToShow = []

        for(let index = 0; index < 7; index++) {
            const date = new Date()

            date.setDate(date.getDate() - index)            

            dataToShow.unshift({
                date: moment(date).format("YYYY-MM-DD"),
                values: []
            })
        }

        for(const dataToShowData of dataToShow) {
            for(const dataData of data) {
                if(dataToShowData.date === dataData.date) {
                    dataToShowData.values = dataData.values
                }
            }
        }

        await this.setState({data: dataToShow})
    }

    calculateMaxSpendTime() {
        let maxSpendMinutes = this.state.maxSpendMinutes

        for(const data of this.state.data) {
            if(this.getTotalThisDateDataValue(data) > maxSpendMinutes) {
                maxSpendMinutes = this.getTotalThisDateDataValue(data)
            }
        }

        this.setState({maxSpendMinutes})
    }

    getTotalThisDateDataValue(data) {
        let totalThisDateDataValue = 0

        for(const value of data.values) {
            totalThisDateDataValue += value.spendMinutes
        }

        return totalThisDateDataValue
    }
}