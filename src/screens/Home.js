export function Home() {
	const React = require('react')
	const { useState } = React

	const { ProductivityItem } = require('../components/ProductivityItem')
	const { BreakItem } = require('../components/BreakItem')
	const { AddTaskModal } = require('../components/AddTaskModal')

	const [index, setIndex] = useState(2)
	const [data, setData] = useState([
		{
			type: 'productivity',
			activityName: 'Monic',
			taskName: 'Update dashboard',
			startedAt: '',
			emoji: '',
			efforts: []
		},
		{
			type: 'break',
			startedAt: '',
			minutes: 0
		},
		{
			type: 'productivity',
			activityName: 'Monic',
			taskName: 'Building iOS',
			startedAt: '',
			emoji: '',
			efforts: []
		},
		{
			type: 'break',
			startedAt: '11:40',
			minutes: 20
		},
		{
			type: 'productivity',
			activityName: 'Sewa - Sewa',
			taskName: 'Membuat layout home',
			startedAt: '08:30',
			emoji: '💪',
			efforts: [
				{
					minutes: 90,
					type: 'productive'
				},
				{
					minutes: 20,
					type: 'break'
				},
				{
					minutes: 90,
					type: 'productive'
				}
			]
		}
	])
	const [mode, setMode] = useState('Work')
	const [addTaskToIndex, setAddTaskToIndex] = useState(null)

	const FADE_OPACITY = 0.2

	return (
		<div
			className = 'home-container'
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
						:
						null
				}

				{
					data.map((dataItem, dataIndex) => {
						return (
							<div
								key = {JSON.stringify(dataItem)}
							>
								{
									dataIndex !== 0 ?
										(
											mode === 'Edit' && index != null && dataIndex <= index + 1 ?	
												<div
													className = 'item-filler'
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
					mode === 'Edit' && index === data.length - 1 ?
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
						:
						null
				}
			</div>

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
				emoji: '',
				efforts: []
			}
		)
		
		await setData(currentData)
		await setIndex(index == null ? 0 : index + 1)
		setAddTaskToIndex(null)
	}
}