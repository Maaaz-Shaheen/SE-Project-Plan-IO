import React from "react";
import TasksListItems from "./TasksListItems";
import { startDeleteTaskAction, startEditTaskAction } from "../actions/tasks";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import filteredTasks from "../selectors/tasks";

class TasksList extends React.Component {
	state = {
		loadingPara: "No tasks found!",
		loaded: false,
	};

	deleteTask = (task, FID) => {
		// console.log(key);
		if (this.props.moreInfo.fid === FID) {
			this.props.resetEditState();
		}
		this.props.deleteTask(task, FID);
	};

	setEditState = (i, fid) => {
		// console.log(this.props.tasks[i]);
		const newState = {
			editState: true,
			fid,
			data: {
				...this.props.tasks[i].data,
			},
		};

		if (!newState.data.contexts) {
			newState.data.contexts = {};
		}

		this.props.contexts.forEach((context) => {
			if (!newState.data.contexts[context.key]) {
				newState.data.contexts[context.key] = false;
			}
		});

		console.log("contexted", newState);

		this.props.setEditState(newState);
	};

	handleCheck = (e, i, fid) => {
		if (this.props.moreInfo.fid === fid) {
			this.props.resetEditState();
		}
		const checkedTask = {
			...this.props.tasks[i],
		};
		checkedTask.data.completed = e.target.checked;
		this.props.editTask(checkedTask, fid);
		// console.log(this.props.tasks);
	};

	render() {
		// console.log(this.props.moreInfo);
		return this.props.tasks.length > 0 ? (
			<div className="tasksList">
				{this.props.tasks.map((task, i) => {
					return (
						<TasksListItems
							task={task.data}
							key={task.key}
							deleteTask={() => this.deleteTask(task, task.key)}
							editTask={() => this.setEditState(i, task.key)}
							handleCheck={(e) => this.handleCheck(e, i, task.key)}
						/>
					);
				})}
			</div>
		) : (
			<p className="tasksList-loadingPara">{this.state.loadingPara}</p>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: filteredTasks(state.tasks, state.filters),
		moreInfo: state.moreInfo,
		contexts: state.contexts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteTask: (task, FID) => dispatch(startDeleteTaskAction(task, FID)),
		editTask: (task, FID) => dispatch(startEditTaskAction(task, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
