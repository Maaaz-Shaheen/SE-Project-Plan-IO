const initialState = {
	editState: false,
	// arrID: "",
	fid: "",
	data: {
		contexts: {},
	},
	addingNew: false,
};

const statesReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_NEW_MORE_INFO":
			return {
				...initialState,
				editState: true,
				addingNew: true,
				data: {
					...action.data,
				},
			};
		case "EDIT_MORE_INFO":
			return {
				...state,
				...action.newState,
			};
		case "RESET_MORE_INFO":
			return {
				...initialState,
			};

		default:
			return state;
	}
};

export default statesReducer;
