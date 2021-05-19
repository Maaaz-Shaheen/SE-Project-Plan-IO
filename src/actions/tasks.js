import database from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

// Get tasks from firebase action generator

const getTasksAction = (tasksArray) => {
	return {
		type: "GET_TASKS",
		tasksArray,
	};
};

export const startGetTasksAction = () => {
	const user_id = firebase.auth().currentUser.uid;
	return (dispatch) => {
		const tasks = [];
		database
			.ref(`${user_id}/tasks`)
			.once("value", (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const task = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					};
					// needs to be added because firebase does not keep empty objects
					if (!task.data.contexts) {
						task.data.contexts = {};
					}
					if (!task.data.description) {
						task.data.description = "";
					}
					if (!task.data.priority) {
						task.data.priority = -1;
					}

					if (!task.data.timeStamp) {
						task.data.timeStamp = -1;
					}
					if (!task.data.order) {
						task.data.order = "none";
					}

					tasks.push(task);
				});
			})
			.then(() => {
				dispatch(getTasksAction(tasks));
			});
	};
};

// Add Task action generator

const addTaskAction = (task) => {
	return {
		type: "ADD_TASK",
		task,
	};
};

export const startQuickAddTaskAction = (task) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/tasks`)
			.push({
				taskText: task,
				completed: false,
				project: "",
				priority: -1,
				contexts: {},
				timeStamp: -1,
				description: "",
				order: "none",
			})
			.then((snapshot) => {
				const taskData = {
					data: {
						taskText: task,
						completed: false,
						project: "",
						priority: -1,
						contexts: {},
						timeStamp: -1,
						description: "",
						order: "none",
					},
					key: snapshot.key,
				};

				// getState.contexts.forEach((context) => {
				// 	if (!newState.data.contexts[context.key]) {
				// 		newState.data.contexts[context.key] = false;
				// 	}
				// });
				// if (!getState.data.contexts[context.key]) {
				// 	getState.data.contexts[context.key] = false;
				// }
				dispatch(addTaskAction(taskData));
				console.log(getState().tasks);
			});
	};
};

export const startAddTaskAction = (task) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/tasks`)
			.push(task)
			.then((snapshot) => {
				const taskData = {
					data: {
						...task,
					},
					key: snapshot.key,
				};
				dispatch(addTaskAction(taskData));
				console.log(getState().tasks);
			});
	};
};

// Delete all tasks action generator

const deleteAllTasksAction = () => {
	return {
		type: "DELETE_ALL_TASKS",
	};
};

export const startDeleteAllTasksAction = () => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/tasks`)
			.remove()
			.then(() => {
				dispatch(deleteAllTasksAction());
			});
	};
};

// Delete specific tasks action generator

const deleteTaskAction = (FID) => {
	return {
		type: "DELETE_TASK",
		FID,
	};
};

export const startDeleteTaskAction = (task, FID) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/tasks/${FID}`)
			.remove()
			.then(() => {
				dispatch(deleteTaskAction(FID));
			});
	};
};

// Edit specific tasks action generator

const setEditTaskAction = (task) => {
	return {
		type: "EDIT_TASK",
		task,
	};
};

export const startEditTaskAction = (editedTask, editedTaskFID) => {
	console.log(editedTask);
	return (dispatch, getState) => {
		dispatch(setEditTaskAction(editedTask));
		database.ref(`${getState().auth.uid}/tasks/${editedTaskFID}`).set(editedTask.data);
		// .then((snapshot) => {});
	};
};

// /// CONTEXTs && TASKS

// const addContextToTaskAction = (task) => {
// 	return {
// 		type: "ADD_CONTEXT_TO_TASK",
// 		task,
// 	};
// };

// export const startAddContextToTaskAction = (task) => {
// 	return (dispatch, getState) => {
// 		database
// 			.ref(`${getState().auth.uid}/tasks`)
// 			.push({ taskText: task, completed: false })
// 			.then((snapshot) => {
// 				const taskData = {
// 					data: {
// 						taskText: task,
// 						completed: false,
// 					},
// 					key: snapshot.key,
// 				};
// 				dispatch(addTaskAction(taskData));
// 				console.log(getState().tasks);
// 			});
// 	};
// };
