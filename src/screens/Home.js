import React from 'react'

import ProductivityItem from '../components/ProductivityItem'
import BreakItem from '../components/BreakItem'
import AddTaskModal from '../components/AddTaskModal'
import CounterModal from '../components/CounterModal'
import BreakCounterModal from '../components/BreakCounterModal'
import PerformanceChart from '../components/PerformanceChart'

import keys from '../refs/keys'
import { getRandomColor } from '../refs/colors'

const FADE_OPACITY = 0.2

export default class extends React.Component {
	latestId = 0
	progresses = []
	activityName = ''
	taskName = ''

	state = {
		index: null,
		data: [],
		mode: 'Main',
		addTaskToIndex: null,
		isProcessingCount: false,
		isBreakProcessingCount: false
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		const { state } = this
		const { addTaskToIndex, data, index, mode, isProcessingCount, isBreakProcessingCount } = state

		return (
			<div
				className = 'home-container'
				style = {{
					backgroundColor: mode === 'Main' ? 'black' : 'rgb(50,50,50)'
				}}
			>
				<div
					className = 'home-title-container'
				>
					<h1
						style = {{
							color: 'white',
							opacity: mode === 'Main' && index !== null ? FADE_OPACITY : 1
						}}
					>
						Dedicated Time Winner
					</h1>
				</div>

				<div
					className = 'top-buttons-container'
				>
					{
						mode === 'View Edit' ?
							<a
								className = 'top-button'
								href = '/#'
								onClick = {() => this.seeMyPerformance()}
								style = {{
									opacity: mode === 'Main'  && index !== null ? FADE_OPACITY : 1
								}}
							>
								See my performance
							</a>
							:
							null
					}

					<a
						className = 'top-button'
						href = '/#'
						onClick = {() => this.setState({mode: mode === 'View Edit' ? 'Main' : 'View Edit'})}
						style = {{
							opacity: mode === 'Main'  && index !== null ? FADE_OPACITY : 1
						}}
					>
						{mode === 'View Edit' ? 'Back to Main Area' : 'Go to View-Edit Area'}
					</a>
				</div>

				<div
					className = 'home-content-container'
				>
					{
						mode === 'View Edit' ?
							<div
								className = 'add-item-container'
								style = {{
									marginBottom: 30
								}}
							>
								<div
									className = 'add-item'
								>
									<a
										href = '/#'
										onClick = {() => this.addTask(0)}
									>
										<p>
											+ Add Task
										</p>
									</a>
								</div>

								<div
									className = 'add-item-divider'
								/>

								<div
									className = 'add-item'
								>
									<a
										href = '/#'
										onClick = {() => this.addBreak(0)}
									>
										<p>
											+ Add Break
										</p>
									</a>
								</div>
							</div>
							:
							null
					}

					{
						data.map((dataItem, dataIndex) => {
							return (
								<div
									key = {dataItem.id}
								>
									{
										dataIndex !== 0 ?
											(
												mode === 'View Edit' && index != null && dataIndex <= index + 1 ?	
													<div
														className = 'item-filler'
													>
														<div
															className = 'add-item-filler-container'
														>
															<div
																className = 'add-item'
																style = {{
																	margin: 0
																}}
															>
																<a
																	href = '/#'
																	onClick = {() => this.addTask(dataIndex)}
																>
																	<p>
																		+ Add Task
																	</p>
																</a>
															</div>

															<div
																className = 'add-item-divider'
															/>

															<div
																className = 'add-item'
																style = {{
																	margin: 0
																}}
															>
																<a
																	href = '/#'
																	onClick = {() => this.addBreak(dataIndex)}
																>
																	<p>
																		+ Add Break
																	</p>
																</a>
															</div>
														</div>
													</div>
													:
													<div
														className = 'item-filler-permanent'
													/>
											)
											:
											null
									}

									<div
										style = {{
											opacity: (
												(
													mode === 'Main' &&
													index !== null &&
													index !== dataIndex
												)
												||
												(
													mode === 'View Edit' &&
													index !== null &&
													index < dataIndex
												)
											) ? FADE_OPACITY : 1
										}}
									>
										{
											dataItem.type === 'productivity' ?
												<ProductivityItem
													focusAtIndex = {index}
													index = {dataIndex}
													item = {dataItem}
													mode = {mode}
													onRemove = {() => this.removeItem(dataIndex)}
													onStart = {() => this.setState({isProcessingCount: true})}
												/>
												:
												<BreakItem
													focusAtIndex = {index}
													index = {dataIndex}
													item = {dataItem}
													mode = {mode}
													onRemove = {() => this.removeItem(dataIndex)}
													onStart = {() => this.setState({isBreakProcessingCount: true})}
												/>
										}
									</div>
								</div>
							)
						})
					}

					{
						mode === 'View Edit' && data.length > 0 && index === data.length - 1 ?
							<div
								className = 'add-item-container'
								style = {{
									marginTop: 30
								}}
							>
								<div
									className = 'add-item'
								>
									<a
										href = '/#'
										onClick = {() => this.addTask(data.length)}
									>
										<p>
											+ Add Task
										</p>
									</a>
								</div>

								<div
									className = 'add-item-divider'
								/>

								<div
									className = 'add-item'
								>
									<a
										href = '/#'
										onClick = {() => this.addBreak(data.length)}
									>
										<p>
											+ Add Break
										</p>
									</a>
								</div>
							</div>
							:
							null
					}
				</div>

				<PerformanceChart />

				{
					isProcessingCount ?
						<CounterModal
							currentTask = {data[index].taskName}
							sendProgresses = {this.sendProgresses}
						/>
						:
						null
				}

				{
					isBreakProcessingCount ?
						<BreakCounterModal
							sendBreakProgress = {this.sendBreakProgress}
						/>
						:
						null
				}

				{
					addTaskToIndex !== null ?
						<AddTaskModal
							onAddTask = {(activityName, taskName) => this.applyAddTask(activityName, taskName)}
							onDismiss = {() => this.setState({addTaskToIndex: null})}
						/>
						:
						null
				}
			</div>
		)
	}

	async loadData() {
		// localStorage.removeItem(keys.LOCAL_STORAGE_DATA)
		// localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
		// localStorage.removeItem(keys.LOCAL_STORAGE_RUNNING_PROGRESS)
		// localStorage.removeItem(keys.LOCAL_STORAGE_RUNNING_BREAK_PROGRESS)
		// await localStorage.setItem(keys.LOCAL_STORAGE_DATA, `
		// [
		// 	{
		// 		"type": "productivity",
		// 		"activityName": "Dedicated Time Winner",
		// 		"taskName": "Memasang API home",
		// 		"startedAt": "10:59",
		// 		"minutes": 120,
		// 		"emoji": "💪",
		// 		"id": 14
		// 	},
		// 	{
		// 		"type": "productivity",
		// 		"activityName": "Sewa-Sewa",
		// 		"taskName": "Memasang API home",
		// 		"startedAt": "10:59",
		// 		"minutes": 90,
		// 		"emoji": "💪",
		// 		"id": 12
		// 	},
		// 	{
		// 		"type": "productivity",
		// 		"activityName": "Sewa-Sewa",
		// 		"taskName": "Memasang API home",
		// 		"startedAt": "10:58",
		// 		"minutes": 50,
		// 		"emoji": "💪",
		// 		"id": 8
		// 	},
		// 	{
		// 		"type": "productivity",
		// 		"activityName": "Dedicated Time Winner",
		// 		"taskName": "Update PM",
		// 		"startedAt": "10:52",
		// 		"minutes": 45,
		// 		"emoji": "💪",
		// 		"id": 1
		// 	}
		// ]
		// `)

		let data = await localStorage.getItem(keys.LOCAL_STORAGE_DATA)
		let newIndex = await localStorage.getItem(keys.LOCAL_STORAGE_INDEX)
		let runningProgress = await localStorage.getItem(keys.LOCAL_STORAGE_RUNNING_PROGRESS)
		let runningBreakProgress = await localStorage.getItem(keys.LOCAL_STORAGE_RUNNING_BREAK_PROGRESS)

		if(data !== null) {
			data = JSON.parse(data)

			navigator.clipboard.writeText(JSON.stringify(data, null, 4))

			for(const item of data) {
				if(this.latestId < item.id) {
					this.latestId = item.id + 1
				}
			}

			this.setState({data})
		}

		if(newIndex !== null) {
			this.setState({index: Number(newIndex)})
		}

		if(runningProgress !== null) {
			this.setState({isProcessingCount: true})
		}

		if(runningBreakProgress !== null) {
			this.setState({isBreakProcessingCount: true})
		}
	}

	sendProgresses = async(newProgresses) => {
		const { state } = this
		const { data, index } = state

		this.setState({isProcessingCount: false})

		const newData = JSON.parse(JSON.stringify(data))

		this.activityName = newData[index].activityName
		this.taskName = newData[index].taskName

		this.progresses = newProgresses

		for(const progressIndex in this.progresses) {
			const thisProgress = this.progresses[progressIndex]

			if(Number(progressIndex) !== 0) {
				const progressType = thisProgress.type

				this.latestId++

				if(progressType === 'productivity') {
					newData.splice(
						index,
						0,
						{
							type: 'productivity',
							activityName: this.activityName,
							taskName: this.taskName,
							startedAt: '',
							minutes: 0,
							emoji: '',
							id: this.latestId
						}
					)
				} else if(progressType === 'break') {
					newData.splice(
						index,
						0,
						{
							type: 'break',
							startedAt: '',
							minutes: 0,
							id: this.latestId
						}
					)
				}
			}
		}

		this.setState({
			index: index + this.progresses.length - 1,
			data: newData
		})
		
		this.updateProgresses(newData, index + this.progresses.length - 1)

		this.assignColorIfHaveNoColor(newData[index].activityName)
	}

	sendBreakProgress = (startedAt, dayDate, minutes) => {
		const { state } = this
		const { data, index } = state

		const newData = JSON.parse(JSON.stringify(data))
		let newIndex = index - 1 < 0 ? null : index - 1

		newData[index].startedAt = startedAt
		newData[index].minutes = minutes
		newData[index].dayDate = dayDate

		this.setState({
			isBreakProcessingCount: false,
			data: newData,
			index: newIndex
		})

		if(newIndex !== null) {
			localStorage.setItem(keys.LOCAL_STORAGE_INDEX, newIndex)
		} else {
			localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
		}

		localStorage.setItem(keys.LOCAL_STORAGE_DATA, JSON.stringify(newData))
	}
	 
	removeItem(dataIndex) {
		const { state } = this
		const { data, index } = state

		const newData = []

		for(const thisDataIndex in data) {
			if(dataIndex !== Number(thisDataIndex)) {
				newData.push(data[thisDataIndex])
			}
		}

		let newIndex = dataIndex > index ? index : (index > 0 ? index - 1 : null)

		this.setState({
			data: newData,
			index: newIndex
		})

		if(newIndex !== null) {
			localStorage.setItem(keys.LOCAL_STORAGE_INDEX, newIndex)
		} else {
			localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
		}

		localStorage.setItem(keys.LOCAL_STORAGE_DATA, JSON.stringify(newData))
	}
	 
	addTask(toIndex) {
		this.setState({addTaskToIndex: toIndex})
	}

	async addBreak(toIndex) {
		const { state } = this
		const { data, index } = state
		
		const newData = JSON.parse(JSON.stringify(data))

		this.latestId++

		newData.splice(
			toIndex,
			0,
			{
				type: 'break',
				startedAt: '',
				minutes: 0,
				id: this.latestId
			}
		)

		let newIndex = index == null ? 0 : index + 1

		this.setState({
			data: newData,
			index: newIndex
		})

		if(newIndex !== null) {
			localStorage.setItem(keys.LOCAL_STORAGE_INDEX, newIndex)
		} else {
			localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
		}

		localStorage.setItem(keys.LOCAL_STORAGE_DATA, JSON.stringify(newData))
	}

	async applyAddTask(activityName, taskName) {
		const { state } = this
		const { addTaskToIndex, data, index } = state

		const newData = JSON.parse(JSON.stringify(data))

		this.latestId++

		newData.splice(
			addTaskToIndex,
			0,
			{
				type: 'productivity',
				activityName: activityName,
				taskName: taskName,
				startedAt: '',
				minutes: 0,
				emoji: '',
				id: this.latestId
			}
		)

		let newIndex = index == null ? 0 : index + 1
		
		this.setState({
			data: newData,
			index: newIndex,
			addTaskToIndex: null
		})

		if(newIndex !== null) {
			localStorage.setItem(keys.LOCAL_STORAGE_INDEX, newIndex)
		} else {
			localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
		}

		localStorage.setItem(keys.LOCAL_STORAGE_DATA, JSON.stringify(newData))
	}

	async assignColorIfHaveNoColor(activityName) {
		const asssignedColors = await localStorage.getItem(keys.LOCAL_STORAGE_ASSIGNED_COLORS)

		let asssignedColorsJSON = {}

		if(asssignedColors !== null) {
			asssignedColorsJSON = JSON.parse(asssignedColors)

			if(asssignedColorsJSON[activityName] == undefined) {
				asssignedColorsJSON[activityName] = getRandomColor()
			}
		} else {
			asssignedColorsJSON[activityName] = getRandomColor()
		}

		await localStorage.setItem(keys.LOCAL_STORAGE_ASSIGNED_COLORS, JSON.stringify(asssignedColorsJSON))
	}
	 
	updateProgresses(newData, latestIndex, progressIndex = 0) {
		let currentIndex = latestIndex

		const thisProgress = this.progresses[progressIndex]

		if(Number(progressIndex) === 0) {
			newData[currentIndex].startedAt = thisProgress.startedAt
			newData[currentIndex].minutes = thisProgress.minutes
			newData[currentIndex].emoji = thisProgress.emoji
			newData[currentIndex].dayDate = thisProgress.dayDate
		} else {
			const progressType = thisProgress.type

			if(progressType === 'productivity') {
				newData[currentIndex].startedAt = thisProgress.startedAt
				newData[currentIndex].minutes = thisProgress.minutes
				newData[currentIndex].emoji = thisProgress.emoji
				newData[currentIndex].dayDate = thisProgress.dayDate
			} else if(progressType === 'break') {
				newData[currentIndex].startedAt = thisProgress.startedAt
				newData[currentIndex].minutes = thisProgress.minutes
				newData[currentIndex].dayDate = thisProgress.dayDate
			}
		}

		--currentIndex

		if(currentIndex < 0) {
			currentIndex = null
		}

		this.setState({
			data: newData,
			index: currentIndex
		})

		if(progressIndex < this.progresses.length - 1) {
			setTimeout(() => {
				this.updateProgresses(newData, currentIndex, Number(progressIndex) + 1)
			}, 150)
		} else {
			if(currentIndex) {
				localStorage.setItem(keys.LOCAL_STORAGE_INDEX, currentIndex)
			} else {
				localStorage.removeItem(keys.LOCAL_STORAGE_INDEX)
			}

			localStorage.setItem(keys.LOCAL_STORAGE_DATA, JSON.stringify(newData))
		}
	}

	seeMyPerformance() {
		alert('See performance chart')
	}
}