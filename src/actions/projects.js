import database from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

// Get tasks from firebase action generator

const getProjectsAction = (projectsArray) => {
	return {
		type: "GET_PROJECTS",
		projectsArray,
	};
};

export const startGetProjectsAction = () => {
	const user_id = firebase.auth().currentUser.uid;
	return (dispatch) => {
		const projects = [];
		database
			.ref(`${user_id}/projects`)
			.once("value", (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const project = {
						key: childSnapshot.key,
						projectData: childSnapshot.val(),
					};
					projects.push(project);
				});
			})
			.then(() => {
				dispatch(getProjectsAction(projects));
			});
	};
};

// Add Task action generator

const addProjectAction = (project) => {
	return {
		type: "ADD_PROJECT",
		project,
	};
};

export const startAddProjectAction = (project) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/projects`)
			.push(project)
			.then((snapshot) => {
				const projectData = {
					projectData: {
						...project,
					},
					key: snapshot.key,
				};
				dispatch(addProjectAction(projectData));
				console.log(getState().tasks);
			});
	};
};

// // Delete all tasks action generator

// const deleteAllTasksAction = () => {
// 	return {
// 		type: "DELETE_ALL_TASKS",
// 	};
// };

// export const startDeleteAllTasksAction = () => {
// 	return (dispatch, getState) => {
// 		database
// 			.ref(`${getState().auth.uid}/tasks`)
// 			.remove()
// 			.then(() => {
// 				dispatch(deleteAllTasksAction());
// 			});
// 	};
// };

// // Delete specific tasks action generator

const deleteProjectAction = (FID) => {
	return {
		type: "DELETE_PROJECT",
		FID,
	};
};

export const startDeleteProjectAction = (task, FID) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/projects/${FID}`)
			.remove()
			.then(() => {
				dispatch(deleteProjectAction(FID));
			});
	};
};

// // Edit specific tasks action generator

const setEditProjectAction = (project) => {
	return {
		type: "EDIT_PROJECT",
		project,
	};
};

export const startEditProjectAction = (editedProject, editedProjectFID) => {
	return (dispatch, getState) => {
		dispatch(setEditProjectAction(editedProject));
		console.log(editedProject);
		database
			.ref(`${getState().auth.uid}/projects/${editedProjectFID}`)
			.set(editedProject.projectData);
		// .then((snapshot) => {});
	};
};
