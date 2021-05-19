// Change edit data state

export const addNewMoreInfoAction = (newData) => {
	console.log(newData);
	return {
		type: "ADD_NEW_MORE_INFO",
		data: {
			...newData,
		},
	};
};

export const editDataNewStateAction = (newState) => {
	return {
		type: "EDIT_MORE_INFO",
		newState,
	};
};

export const resetEditStateAction = () => {
	return {
		type: "RESET_MORE_INFO",
	};
};
