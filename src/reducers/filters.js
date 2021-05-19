// Filter Reducer

const filterReducerDefaultState = {
	searchText: "",
	showCompleted: false,
	selectedContexts: {},
	projectFID: "",
	order: "none",
	isInbox: false,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_TEXT_FILTER":
			return {
				...state,
				searchText: action.text,
			};
		case "SET_CONTEXT_FILTER":
			return {
				...state,
				selectedContexts: {
					...action.selectedContexts,
				},
			};

		case "SET_INBOX_FILTER":
			return {
				...state,
				isInbox: action.bool,
			};

		case "SET_PROJECT_FILTER":
			return {
				...state,
				projectFID: action.projectFID,
			};
		case "TOGGLE_COMPLETED_FILTER":
			return {
				...state,
				showCompleted: !state.showCompleted,
			};
		case "SET_PRIORITY_ORDER":
			return {
				...state,
				order: action.order,
			};

		default:
			return state;
	}
};

export default filterReducer;
