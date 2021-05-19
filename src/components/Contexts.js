import React from "react";
import SplitView from "./SplitView";
import ContextsLeft from "./ContextsLeft";
// import TasksModal from "./TasksModal";
import ContextsMiddle from "./ContextsMiddle";
import ContextsRight from "./ContextsRight";

// main component

const Contexts = () => {
	return (
		<div>
			{/* <TasksModal /> */}
			{/* <SplitView left={<ContextsLeft />} middle={<TasksMiddle />} right={<TasksRight />} /> */}
			<SplitView
				left={<ContextsLeft />}
				middle={<ContextsMiddle />}
				right={<ContextsRight />}
			/>
		</div>
	);
};

export default Contexts;
