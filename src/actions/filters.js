// SET_TEXT_FILTER

export const setTextFilterAction = (text = "") => ({
	type: "SET_TEXT_FILTER",
	text,
});

export const toggleCompletedFilterAction = () => ({
	type: "TOGGLE_COMPLETED_FILTER",
});

export const setProjectFilterAction = (projectFID = "") => ({
	type: "SET_PROJECT_FILTER",
	projectFID,
});

export const setContextFilterAction = (selectedContexts = {}) => ({
	type: "SET_CONTEXT_FILTER",
	selectedContexts,
});

export const setPriorityOrderAction = (order = "none") => ({
	type: "SET_PRIORITY_ORDER",
	order,
});

export const setInboxFilterAction = (bool = false) => ({
	type: "SET_INBOX_FILTER",
	bool,
});
