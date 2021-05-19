const tasksReducerDefaultState = [];

const tasksReducer = (state = tasksReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_TASK":
			return [...state, action.task];

		case "DELETE_TASK":
			return state.filter((task) => {
				return task.key !== action.FID;
			});

		case "EDIT_TASK":
			return state.map((task) => {
				if (task.key === action.task.key) {
					return { ...action.task };
				} else {
					return task;
				}
			});

		case "DELETE_ALL_TASKS":
			return [];

		case "GET_TASKS":
			return action.tasksArray;

		default:
			return state;
	}
};

export default tasksReducer;
