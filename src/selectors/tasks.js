const filteredTasks = (tasks, filters) => {
	if (!filters.isInbox) {
		return tasks
			.filter((task) => {
				const textMatch = task.data.taskText
					.toLowerCase()
					.includes(filters.searchText.toLowerCase());
				const showCompleted = filters.showCompleted
					? task.data.completed
					: !task.data.completed;

				let hasContext = true;

				for (const contextFID in filters.selectedContexts) {
					if (!task.data.contexts[contextFID] && filters.selectedContexts[contextFID]) {
						hasContext = false;
						break;
					}
				}

				let taskIsInProject = true;

				if (filters.projectFID !== "") {
					taskIsInProject = filters.projectFID === task.data.project;
				}

				return textMatch && showCompleted && hasContext && taskIsInProject;
			})
			.sort((a, b) => {
				if (filters.order === "ascend") {
					return a.data.priority > b.data.priority ? 1 : -1;
				} else if (filters.order === "descend") {
					return a.data.priority < b.data.priority ? 1 : -1;
				} else if (filters.order === "none") {
					return 1;
				}
			});
	} else {
		return tasks.filter((task) => {
			const textMatch = task.data.taskText
				.toLowerCase()
				.includes(filters.searchText.toLowerCase());

			const checkCompleted = task.data.completed === false;
			const checkOrder = task.data.order === "none";
			const checkTimeStamp = task.data.timeStamp === -1;
			const checkPriority = task.data.priority === -1;
			const checkProject = task.data.project === "";
			const checkDescription = task.data.description === "";

			let checkContext = true;

			for (const contextFID in filters.selectedContexts) {
				if (task.data.contexts[contextFID]) {
					checkContext = false;
					break;
				}
			}

			return (
				textMatch &&
				checkCompleted &&
				checkContext &&
				checkPriority &&
				checkTimeStamp &&
				checkProject &&
				checkDescription
			);
		});
	}
};

const taskByFID = (tasks, FID) => {
	const i = tasks.findIndex((task) => task.key === FID);
	return {
		...tasks[i],
		index: i,
	};
};

export { taskByFID };
export default filteredTasks;
