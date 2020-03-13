import React from 'react'

import moment from 'moment'

export default class extends React.Component {
    state = {
        data: [],
        maxSpendMinutes: 360
    }

    componentDidMount() {
        this.calculateMaxSpendTime()
    }

    render() {
        return (
            <div
                style = {{
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    position: 'fixed',
                    right: 0,
                    top: 0
                }}
            >
                <a
                    href = '/#'
                    onClick = {this.props.onDismiss}
                    style = {{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        bottom: 0,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0
                    }}
                >
                </a>

                <div
                    style = {{
                        bottom: 80,
                        display: 'flex',
                        position: 'absolute',
                        top: 80,
                        zIndex: 1
                    }}
                >
                    <div
                        style = {{
                            backgroundColor: 'white',
                            borderRadius: 7,
                            display: 'flex',
                            minWidth: 250,
                            padding: 20
                        }}
                    >
                        {
                            this.getPerformanceData().map((item, index) => {
                                return (
                                    <div
                                        key = {moment(item.date).format('DD/MM')}
                                        style = {{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginLeft: index === 0 ? 0 : 10
                                        }}
                                    >
                                        <a
                                            href = '#progresses'
                                            // onClick = {() => this.props.selectDate(moment(item.date).format('YYYY-MM-DD'))}
                                        >
                                            <p
                                                style = {{
                                                    color: 'black',
                                                    fontSize: 12
                                                }}
                                            >
                                                {moment(item.date).format('DD/MM')}
                                            </p>
                                        </a>

                                        <div
                                            style = {{
                                                alignItems: 'flex-end',
                                                display: 'flex',
                                                marginTop: 10,
                                                minHeight: 'calc(100% - 20px)'
                                            }}
                                        >
                                            <div
                                                style = {{
                                                    display: 'flex',
                                                    flexDirection: 'column-reverse',
                                                    height:  Number(this.getTotalThisDateDataValue(item) / this.state.maxSpendMinutes * 100).toString() + '%',
                                                    width: 30
                                                }}
                                            >
                                                {
                                                    item.values.map(valueItem => {
                                                        return (
                                                            <a
                                                                href = '#progresses'
                                                                key = {valueItem.id}
                                                                onClick = {() => {
                                                                    setTimeout(() => {
                                                                        if(valueItem.type === 'productivity') {
                                                                            let textToShow = `${valueItem.activityName} (${valueItem.spendMinutes} mins)\n\n${valueItem.taskName}`

                                                                            if(valueItem.progress !== '') {
                                                                                textToShow = `${textToShow}\nProgress: ${valueItem.progress}`
                                                                            }

                                                                            alert(textToShow)
                                                                        } else if(valueItem.type === 'break') {
                                                                            alert(`Break (${valueItem.spendMinutes} mins)`)
                                                                        }
                                                                    }, 100)
                                                                }}
                                                                style = {{
                                                                    alignItems: 'center',
                                                                    backgroundColor: valueItem.color,
                                                                    border: '2px dotted black',
                                                                    color: 'white',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    fontSize: 12,
                                                                    fontWeight: 'bold',
                                                                    flex: valueItem.spendMinutes,
                                                                    justifyContent: 'center',
                                                                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
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
            </div>
        )
    }

    getPerformanceData() {
        const { props } = this
        const { colorsData, nativeData } = props

        let data = []

        for(const item of nativeData) {
            let isDateRegisteredInIndex = null

            for(const dataIndex in data) {
                if(data[dataIndex].date === item.dayDate) {
                    isDateRegisteredInIndex = dataIndex

                    break
                }
            }

            let valuesToAdd = {}

            if(item.type === 'productivity') {
                valuesToAdd = {
                    color: colorsData === undefined ? 'gray' : colorsData[item.activityName],
                    start: item.startedAt,
                    spendMinutes: item.minutes,
                    activityName: item.activityName,
                    taskName: item.taskName,
                    progress: item.emoji,
                    type: item.type,
                    id: item.id
                }
            } else if(item.type === 'break') {
                valuesToAdd = {
                    color: 'darkslateblue',
                    start: item.startedAt,
                    spendMinutes: item.minutes,
                    activityName: 'Break',
                    taskName: '',
                    progress: '',
                    type: item.type,
                    id: item.id
                }
            }

            if(isDateRegisteredInIndex === null) {
                data.push({
                    date: item.dayDate,
                    values: [
                        valuesToAdd
                    ]
                })
            } else {
                data[isDateRegisteredInIndex].values.push(valuesToAdd)

                data[isDateRegisteredInIndex].values.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))
            }
        }

        const dataToShow = []

        for(let index = 0; index < 7; index++) {
            const date = new Date()

            date.setDate(date.getDate() - index)            

            dataToShow.unshift({
                date: moment(date).format('YYYY-MM-DD'),
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

        return dataToShow
    }

    calculateMaxSpendTime() {
        let maxSpendMinutes = this.state.maxSpendMinutes

        for(const data of this.getPerformanceData()) {
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