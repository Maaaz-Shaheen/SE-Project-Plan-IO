import React from "react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import { toggleCompletedFilterAction } from "../actions/filters";
import { addNewMoreInfoAction } from "../actions/states";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TasksLeft = (props) => {
	const addNewTask = () => {
		const task = {
			taskText: "",
			completed: false,
			project: props.projectID ? props.projectID : "",
			contexts: {},
		};
		props.addNewTask(task);
	};

	return (
		<Sidebar>
			<SidebarItem
				icon={faPlus}
				text={`Add New ${props.projectID ? "Sub" : ""} Task`}
				onClick={addNewTask}
			></SidebarItem>
			<SidebarItem onClick={props.toggleCompleted}>
				{" "}
				{props.filters.showCompleted ? "Hide Completed" : "Show Completed"}
			</SidebarItem>
		</Sidebar>
	);
};

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleCompleted: () => dispatch(toggleCompletedFilterAction()),
		addNewTask: (task) => dispatch(addNewMoreInfoAction(task)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksLeft);
