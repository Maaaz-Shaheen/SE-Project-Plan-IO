import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
	let title = "";

	if (props.path === "/tasks") {
		title = "Tasks";
	} else if (props.path === "/contexts") {
		title = "Contexts";
	} else if (props.path === "/inbox") {
		title = "Inbox";
	} else {
		title = "Projects";
	}

	return (
		<header>
			<span className="header-brand">
				<NavLink to="/tasks" onClick={props.resetEditState}>
					Plan.IO
				</NavLink>
			</span>
			<span className="header-title">{title}</span>
			<span className="header-links">
				{/* <NavLink to="/inbox" activeClassName="is-active">
					{" "}
					Inbox{" "}
				</NavLink> */}
				<NavLink to="/tasks" onClick={props.resetEditState} activeClassName="is-active">
					{" "}
					Tasks{" "}
				</NavLink>
				<NavLink to="/inbox" onClick={props.resetEditState} activeClassName="is-active">
					{" "}
					Inbox{" "}
				</NavLink>
				<NavLink to="/contexts" onClick={props.resetEditState} activeClassName="is-active">
					{" "}
					Contexts{" "}
				</NavLink>
				<NavLink to="/projects" onClick={props.resetEditState} activeClassName="is-active">
					{" "}
					Projects{" "}
				</NavLink>
			</span>
		</header>
	);
};

export default Header;
