const contextsReducerDefaultState = [];

const contextsReducer = (state = contextsReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_CONTEXT":
			return [...state, action.context];

		case "DELETE_CONTEXT":
			return state.filter((context) => {
				return context.key !== action.FID;
			});

		case "EDIT_CONTEXT":
			return state.map((context) => {
				if (context.key === action.context.key) {
					return { ...action.context };
				} else {
					return context;
				}
			});

		case "DELETE_ALL_CONTEXTS":
			return [];

		case "GET_CONTEXTS":
			return action.contextsArray;

		default:
			return state;
	}
};

export default contextsReducer;
