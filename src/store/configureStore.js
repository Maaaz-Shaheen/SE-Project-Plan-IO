import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import tasksReducer from "../reducers/tasks";
import contextsReducer from "../reducers/contexts";
import projectsReducer from "../reducers/projects";
import statesReducer from "../reducers/states";
import modalReducer from "../reducers/modal";
import filterReducer from "../reducers/filters";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
const configuredStore = () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			tasks: tasksReducer,
			contexts: contextsReducer,
			projects: projectsReducer,
			moreInfo: statesReducer,
			modal: modalReducer,
			filters: filterReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
};

export default configuredStore;
