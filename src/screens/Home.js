let latestId = 0
let progresses = []
let activityName = ''
let taskName = ''

export function Home() {
	const React = require('react')
	const { useState } = React

	const { ProductivityItem } = require('../components/ProductivityItem')
	const { BreakItem } = require('../components/BreakItem')
	const { AddTaskModal } = require('../components/AddTaskModal')
	const { CounterModal } = require('../components/CounterModal')

	const [index, setIndex] = useState(null)
	const [data, setData] = useState([])
	const [mode, setMode] = useState('Work')
	const [addTaskToIndex, setAddTaskToIndex] = useState(null)
	const [isProcessingCount, setIsProcessingCount] = useState(false)

	const FADE_OPACITY = 0.2

	const sendProgresses = newProgresses => {
		setIsProcessingCount(false)

		const newData = JSON.parse(JSON.stringify(data))

		activityName = newData[index].activityName
		taskName = newData[index].taskName

		progresses = newProgresses

		for(const progressIndex in progresses) {
			const thisProgress = progresses[progressIndex]

			if(Number(progressIndex) !== 0) {
				const progressType = thisProgress.type

				if(progressType === 'productivity') {
					newData.splice(
						index,
						0,
						{
							type: 'productivity',
							activityName: activityName,
							taskName: taskName,
							startedAt: '',
							minutes: 0,
							emoji: '',
							id: latestId
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
							id: latestId
						}
					)
				}

				latestId++
			}
		}

		setIndex(index + progresses.length - 1)
		setData(newData)

		updateProgresses(newData, index + progresses.length - 1)
	}

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
				onClick = {() => setMode(mode === 'Edit' ? 'Work' : 'Edit')}
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
									onClick = {() => addTask(0)}
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
									onClick = {() => addBreak(0)}
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
																onClick = {() => addTask(dataIndex)}
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
																onClick = {() => addBreak(dataIndex)}
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
												onRemove = {() => removeItem(dataIndex)}
												onStart = {() => setIsProcessingCount(true)}
											/>
											:
											<BreakItem
												focusAtIndex = {index}
												index = {dataIndex}
												item = {dataItem}
												mode = {mode}
												onRemove = {() => removeItem(dataIndex)}
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
									onClick = {() => addTask(data.length)}
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
									onClick = {() => addBreak(data.length)}
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
						sendProgresses = {sendProgresses}
					/>
					:
					null
			}

			{
				addTaskToIndex !== null ?
					<AddTaskModal
						onAddTask = {(activityName, taskName) => applyAddTask(activityName, taskName)}
						onDismiss = {() => setAddTaskToIndex(null)}
					/>
					:
					null
			}
		</div>
	)

	function removeItem(dataIndex) {
		const newData = []

		for(const index in data) {
			if(dataIndex !== Number(index)) {
				newData.push(data[index])
			}
		}

		setData(newData)

		setIndex(dataIndex > index ? index : (index > 0 ? index - 1 : null))
	}
	 
	function addTask(toIndex) {
		setAddTaskToIndex(toIndex)
	}

	async function addBreak(toIndex) {
		const currentData = JSON.parse(JSON.stringify(data))

		currentData.splice(
			toIndex,
			0,
			{
				type: 'break',
				startedAt: '',
				minutes: 0,
				id: latestId
			}
		)

		latestId++

		await setData(currentData)
		await setIndex(index == null ? 0 : index + 1)
	}

	async function applyAddTask(activityName, taskName) {
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
				id: latestId
			}
		)

		latestId++
		
		await setData(currentData)
		await setIndex(index == null ? 0 : index + 1)
		await setAddTaskToIndex(null)
	}
	 
	function updateProgresses(newData, latestIndex) {
		let currentIndex = latestIndex

		for(const progressIndex in progresses) {
			setTimeout(() => {
				const thisProgress = progresses[progressIndex]

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

					latestId++
				}

				--currentIndex

				if(currentIndex < 0) {
					currentIndex = null
				}

				setData(newData)
				setIndex(currentIndex)
			}, (Number(progressIndex) + 1) * 150)
		}
	}
}