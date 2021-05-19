import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
// import createHistory from "history/createBrowserHistory";
import LandingPage from "../components/LandingPage";
import NotFoundPage from "../components/NotFoundPage";
import Tasks from "../components/Tasks";
import Contexts from "../components/Contexts";
import Projects from "../components/Projects";
// import AddExpensePage from '../components/AddExpensePage';
// import EditExpensePage from '../components/EditExpensePage';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// export const history = createHistory();
export const history = createBrowserHistory();

const AppRouter = () => {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<PublicRoute path="/" component={LandingPage} exact={true} />
					<PublicRoute path="/signup" component={LandingPage} exact={true} />
					<PrivateRoute path="/tasks" component={Tasks} exact={true} />
					<PrivateRoute path="/contexts" component={Contexts} exact={true} />
					<PrivateRoute path="/projects" component={Projects} exact={true} />
					<PrivateRoute path="/projects/:id" component={Tasks} exact={true} />
					<PrivateRoute path="/inbox" component={Tasks} exact={true} />

					{/* <PrivateRoute path="/create" component={AddExpensePage} />
					<PrivateRoute path="/edit/:id" component={EditExpensePage} /> */}
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
