import React from "react";
import Search from "./Search";
import TasksList from "./TasksList";

const TasksMiddle = () => {
	return (
		<div>
			<Search />
			<TasksList />
		</div>
	);
};

export default TasksMiddle;
