const modaLReducerDefaultState = {
	showQuickAddModal: false,
	showContextFilterModal: false,
	showSortByPriorityModal: false,
};

const modalReducer = (state = modaLReducerDefaultState, action) => {
	// console.log(state);
	switch (action.type) {
		case "TOGGLE_QUICK_ADD_MODAL":
			return {
				...state,
				showQuickAddModal: !state.showQuickAddModal,
			};
		case "TOGGLE_CONTEXT_FILTER_MODAL":
			return {
				...state,
				showContextFilterModal: !state.showContextFilterModal,
			};
		case "TOGGLE_SORT_BY_PRIORITY_MODAL":
			return {
				...state,
				showSortByPriorityModal: !state.showSortByPriorityModal,
			};
		default:
			return state;
	}
};

export default modalReducer;
