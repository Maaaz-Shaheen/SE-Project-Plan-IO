import React from "react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import { addNewMoreInfoAction } from "../actions/states";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ContextsLeft = (props) => {
	const addNewContext = () => {
		const context = {
			contextText: "",
		};
		props.addNewContext(context);
	};
	return (
		<Sidebar>
			<SidebarItem
				icon={faPlus}
				text={"Add New Context"}
				onClick={addNewContext}
			></SidebarItem>
		</Sidebar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewContext: (context) => dispatch(addNewMoreInfoAction(context)),
	};
};

export default connect(undefined, mapDispatchToProps)(ContextsLeft);
