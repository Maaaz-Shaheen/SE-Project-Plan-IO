const projectsReducerDefaultState = [];

const projectsReducer = (state = projectsReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_PROJECT":
			return [...state, action.project];

		case "DELETE_PROJECT":
			return state.filter((project) => {
				return project.key !== action.FID;
			});

		case "EDIT_PROJECT":
			return state.map((project) => {
				if (project.key === action.project.key) {
					return { ...action.project };
				} else {
					return project;
				}
			});

		case "DELETE_ALL_PROJECTS":
			return [];

		case "GET_PROJECTS":
			return action.projectsArray;

		default:
			return state;
	}
};

export default projectsReducer;
