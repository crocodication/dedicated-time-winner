import React from 'react'

import ProductivityItem from '../components/ProductivityItem'
import BreakItem from '../components/BreakItem'
import AddTaskModal from '../components/AddTaskModal'
import CounterModal from '../components/CounterModal'

const FADE_OPACITY = 0.2

export default class extends React.Component {
	latestId = 0
	progresses = []
	activityName = ''
	taskName = ''

	state = {
		index: null,
		data: [],
		mode: 'Work',
		addTaskToIndex: null,
		isProcessingCount: false
	}

	render() {
		const { state } = this
		const { addTaskToIndex, data, index, mode, isProcessingCount } = state

		return (
			<div
				className = 'home-container'
				style = {{
					backgroundColor: mode === 'Work' ? 'black' : 'rgb(50,50,50)'
				}}
			>
				<div
					className = 'home-title-container'
				>
					<h1
						style = {{
							color: 'white',
							opacity: mode === 'Work' && index !== null ? FADE_OPACITY : 1
						}}
					>
						Productivity Planner
					</h1>
				</div>

				<a
					className = 'mode-button'
					href = '/#'
					onClick = {() => this.setState({mode: mode === 'Edit' ? 'Work' : 'Edit'})}
					style = {{
						opacity: mode === 'Work'  && index !== null ? FADE_OPACITY : 1
					}}
				>
					{mode} Mode
				</a>

				<div
					className = 'home-content-container'
				>
					{
						mode === 'Edit' ?
							<div
								className = 'add-item-container'
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
												mode === 'Edit' && index != null && dataIndex <= index + 1 ?	
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
													mode === 'Work' &&
													index !== null &&
													index !== dataIndex
												)
												||
												(
													mode === 'Edit' &&
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
												/>
										}
									</div>
								</div>
							)
						})
					}

					{
						mode === 'Edit' && data.length > 0 && index === data.length - 1 ?
							<div
								className = 'add-item-container'
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

	sendProgresses = newProgresses => {
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

				this.latestId++
			}
		}

		this.setState({
			index: index + this.progresses.length - 1,
			data: newData
		})

		this.updateProgresses(newData, index + this.progresses.length - 1)
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

		this.setState({
			data: newData,
			index: dataIndex > index ? index : (index > 0 ? index - 1 : null)
		})
	}
	 
	addTask(toIndex) {
		this.setState({addTaskToIndex: toIndex})
	}

	async addBreak(toIndex) {
		const { state } = this
		const { data, index } = state
		
		const currentData = JSON.parse(JSON.stringify(data))

		currentData.splice(
			toIndex,
			0,
			{
				type: 'break',
				startedAt: '',
				minutes: 0,
				id: this.latestId
			}
		)

		this.latestId++

		this.setState({
			data: currentData,
			index: index == null ? 0 : index + 1
		})
	}

	async applyAddTask(activityName, taskName) {
		const { state } = this
		const { addTaskToIndex, data, index } = state

		const currentData = JSON.parse(JSON.stringify(data))

		currentData.splice(
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

		this.latestId++
		
		this.setState({
			data: currentData,
			index: index == null ? 0 : index + 1,
			addTaskToIndex: null
		})
	}
	 
	updateProgresses(newData, latestIndex, progressIndex = 0) {
		let currentIndex = latestIndex

		const thisProgress = this.progresses[progressIndex]

		if(Number(progressIndex) === 0) {
			newData[currentIndex].startedAt = thisProgress.startedAt
			newData[currentIndex].minutes = thisProgress.minutes
			newData[currentIndex].emoji = thisProgress.emoji
		} else {
			const progressType = thisProgress.type

			if(progressType === 'productivity') {
				newData[currentIndex].startedAt = thisProgress.startedAt
				newData[currentIndex].minutes = thisProgress.minutes
				newData[currentIndex].emoji = thisProgress.emoji
			} else if(progressType === 'break') {
				newData[currentIndex].startedAt = thisProgress.startedAt
				newData[currentIndex].minutes = thisProgress.minutes
			}

			this.latestId++
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
		}
	}
}