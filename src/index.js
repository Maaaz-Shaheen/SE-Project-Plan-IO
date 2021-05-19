import React from "react";
import ReactDOM from "react-dom";

// Router
import AppRouter, { history } from "./routers/AppRouter";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.css";

// Redux

import configureStore from "./store/configureStore";
import { startGetTasksAction } from "./actions/tasks";
import { startGetContextsAction } from "./actions/contexts";
import { startGetProjectsAction } from "./actions/projects";
// import { startSetExpenses } from './actions/expenses';
import { login, logout } from "./actions/auth";
// import getVisibleExpenses from './selectors/expenses';
import { Provider } from "react-redux";

// Firebase
import { firebase } from "./firebase/firebase";

// import { setContextFilterAction } from "./actions/filters";

// Working
const store = configureStore();

// const contextTest = { "-Ma-dYjxspA4VajdYu1U": true };
// const contextTest2 = { "-Ma-otlOed7Sgmfkbm5n": true };

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById("root"));
		hasRendered = true;
	}
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("root"));

// registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(startGetTasksAction());
		store.dispatch(startGetContextsAction());
		store.dispatch(startGetProjectsAction());

		// store.dispatch(setContextFilterAction(contextTest2));

		store.dispatch(login(user.uid));
		renderApp();
		if (history.location.pathname === "/") {
			history.push("/dashboard");
		}
		ReactDOM.render(jsx, document.getElementById("root"));
		// store.dispatch(startSetExpenses()).then(() => {
		// });
	} else {
		store.dispatch(logout());
		renderApp();
		history.push("/");
	}
});
