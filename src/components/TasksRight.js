import React, { useState, forwardRef } from "react";
import MoreInfoSection from "./MoreInfoSection";
import { startEditTaskAction, startAddTaskAction } from "../actions/tasks";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import { taskByFID } from "../selectors/tasks";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerUI = forwardRef(({ value, onClick }, ref) => (
	<Button block onClick={onClick} ref={ref}>
		{value}
	</Button>
));

const TasksRight = (props) => {
	// const [taskContexts, setTaskContexts] = useState({});

	const onTextChange = (e) => {
		const newState = {
			...props.moreInfo,
		};
		newState.data.taskText = e.target.value;
		props.setEditState(newState);
	};

	const onDescriptionChange = (e) => {
		const newState = {
			...props.moreInfo,
		};
		newState.data.description = e.target.value;
		props.setEditState(newState);
	};

	const onPriorityChange = (e) => {
		console.log(e.target.value);
		const newState = {
			...props.moreInfo,
		};
		newState.data.priority = parseInt(e.target.value);
		props.setEditState(newState);
	};

	const handleContextCheck = (e, FID) => {
		const myContexts = {
			...props.moreInfo.data.contexts,
		};
		myContexts[FID] = e.target.checked;

		// setTaskContexts(myContexts);

		const newState = {
			...props.moreInfo,
		};

		newState.data.contexts = {
			...myContexts,
		};

		console.log("my", newState);

		props.setEditState(newState);
	};

	const handleDateChange = (date) => {
		const newState = {
			...props.moreInfo,
		};
		newState.data.timeStamp = date.setHours(0);
		props.setEditState(newState);
	};

	const saveTask = () => {
		const myTaskData = {
			...props.moreInfo.data,
		};
		console.log("myTaskData", myTaskData);

		if (props.moreInfo.fid === "") {
			props.addTask(myTaskData);
		} else {
			const editedTask = {
				key: props.moreInfo.fid,
				data: myTaskData,
			};
			props.editTask(editedTask, props.moreInfo.fid);
		}
		// console.log("hello", props.task);
		props.resetEditState();
	};
	return (
		<MoreInfoSection
			placeHolderText="Select a task for more details"
			showEditable={props.moreInfo.editState}
		>
			<div className="right">
				<div>
					<div className="right-title">
						Title:
						<Form.Control
							value={props.moreInfo.data.taskText}
							onChange={onTextChange}
						/>
					</div>
					<hr />
					<div>
						<h5>Description:</h5>

						<Form.Control
							value={props.moreInfo.data.description}
							onChange={onDescriptionChange}
							as="textarea"
						/>
					</div>
					<hr />
					<div>
						<h5>Contexts</h5>
						{props.contexts.length > 0 ? (
							<div className="right-multipleChoice">
								{props.contexts.map((context, i) => {
									return (
										<label key={context.key}>
											<input
												type="checkbox"
												checked={
													props.moreInfo.data.contexts[context.key] ||
													false
												}
												onChange={(e) => handleContextCheck(e, context.key)}
											/>
											<span>{context.contextData.contextText}</span>
										</label>
									);
								})}
							</div>
						) : (
							"You have not added any contexts yet!"
						)}
					</div>
					<hr />

					<div>
						<h5>Priority Status</h5>
						<div className="right-multipleChoice">
							{/* <div className="right-multipleChoice" onChange={onPriorityChange}> */}
							<div>
								<input
									type="radio"
									id="choice0"
									name="priority"
									value={-1}
									checked={props.moreInfo.data.priority === -1}
									onChange={onPriorityChange}
								/>
								<span>
									<label htmlFor="choice0">None</label>
								</span>
							</div>

							<div>
								<input
									type="radio"
									id="choice1"
									name="priority"
									value={0}
									checked={props.moreInfo.data.priority === 0}
									onChange={onPriorityChange}
								/>
								<span>
									<label htmlFor="choice1">Low</label>
								</span>
							</div>

							<div>
								<input
									type="radio"
									id="choice2"
									name="priority"
									value={1}
									checked={props.moreInfo.data.priority === 1}
									onChange={onPriorityChange}
								/>
								<span>
									<label htmlFor="choice2">Medium</label>
								</span>
							</div>

							<div>
								<input
									type="radio"
									id="choice3"
									name="priority"
									value={2}
									checked={props.moreInfo.data.priority === 2}
									onChange={onPriorityChange}
								/>
								<span>
									<label htmlFor="choice3">High</label>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<DatePicker
						// className="right-datePicker"
						minDate={new Date()}
						selected={props.moreInfo.data.timeStamp}
						onChange={(date) => handleDateChange(date)}
						dateFormat="MMMM d, yyyy"
						fixedHeight
						maxlength="300"
						popperPlacement="top"
						closeOnScroll={true}
						customInput={<DatePickerUI />}
						required
						withPortal
					/>
				</div>
				<Button
					size="lg"
					variant="success"
					onClick={saveTask}
					disabled={!props.moreInfo.data.taskText}
				>
					Save
				</Button>
			</div>
		</MoreInfoSection>
	);
};

const mapStateToProps = (state) => {
	return {
		task: taskByFID(state.tasks, state.moreInfo.fid),
		moreInfo: state.moreInfo,
		contexts: state.contexts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (taskData) => dispatch(startAddTaskAction(taskData)),
		// deleteTask: (task, FID) => dispatch(startDeleteTaskAction(task, FID)),
		editTask: (task, FID) => dispatch(startEditTaskAction(task, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksRight);
