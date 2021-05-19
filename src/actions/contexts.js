import database from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

// Get tasks from firebase action generator

const getContextsAction = (contextsArray) => {
	return {
		type: "GET_CONTEXTS",
		contextsArray,
	};
};

export const startGetContextsAction = () => {
	const user_id = firebase.auth().currentUser.uid;
	return (dispatch) => {
		const contexts = [];
		database
			.ref(`${user_id}/contexts`)
			.once("value", (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					const context = {
						key: childSnapshot.key,
						contextData: childSnapshot.val(),
					};
					contexts.push(context);
				});
			})
			.then(() => {
				dispatch(getContextsAction(contexts));
			});
	};
};

// Add Task action generator

const addContextAction = (context) => {
	return {
		type: "ADD_CONTEXT",
		context,
	};
};

export const startAddContextAction = (context) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/contexts`)
			.push(context)
			.then((snapshot) => {
				const contextData = {
					contextData: {
						...context,
					},
					key: snapshot.key,
				};
				dispatch(addContextAction(contextData));
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

const deleteContextAction = (FID) => {
	return {
		type: "DELETE_CONTEXT",
		FID,
	};
};

export const startDeleteContextAction = (task, FID) => {
	return (dispatch, getState) => {
		database
			.ref(`${getState().auth.uid}/contexts/${FID}`)
			.remove()
			.then(() => {
				dispatch(deleteContextAction(FID));
			});
	};
};

// // Edit specific tasks action generator

const setEditContextAction = (context) => {
	return {
		type: "EDIT_CONTEXT",
		context,
	};
};

export const startEditContextAction = (editedContext, editedContextFID) => {
	return (dispatch, getState) => {
		dispatch(setEditContextAction(editedContext));
		console.log(editedContext);
		database
			.ref(`${getState().auth.uid}/contexts/${editedContextFID}`)
			.set(editedContext.contextData);
		// .then((snapshot) => {});
	};
};
