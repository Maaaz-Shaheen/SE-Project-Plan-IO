import React from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import QuickAddModal from "../components/QuickAddModal";
import ContextFilterModal from "../components/ContextFilterModal";
import SortByPriorityModel from "../components/SortByPriorityModel";

import { resetEditStateAction } from "../actions/states";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
	isAuthenticated,
	resetEditState,
	component: Component,
	path,
	...rest
}) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isAuthenticated ? (
					<div>
						<Header resetEditState={resetEditState} path={path} />
						<QuickAddModal />
						<ContextFilterModal />
						<SortByPriorityModel />
						<Component {...props} />
					</div>
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
	resetEditState: () => dispatch(resetEditStateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
