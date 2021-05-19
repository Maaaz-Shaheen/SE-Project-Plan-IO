import React from "react";
import SideBarItem from "./SidebarItem";
import { faBolt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { startLogout } from "../actions/auth";
import { toggleQuickAddModalAction } from "../actions/modal";

import { connect } from "react-redux";

const Sidebar = (props) => {
	return (
		<div className="sidebar">
			<SideBarItem icon={faBolt} text="Quick Add" onClick={props.toggleModal}></SideBarItem>
			{props.children}
			<div className="sidebar-item--logout" onClick={props.startLogout}>
				<SideBarItem icon={faSignOutAlt} text={"Logout"} />
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		startLogout: () => dispatch(startLogout()),
		toggleModal: () => dispatch(toggleQuickAddModalAction()),
	};
};

export default connect(undefined, mapDispatchToProps)(Sidebar);
