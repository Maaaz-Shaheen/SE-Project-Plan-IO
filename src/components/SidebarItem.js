import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarItem = (props) => {
	if (props.icon) {
		return (
			<div className="sidebar-item" onClick={props.onClick}>
				<FontAwesomeIcon icon={props.icon} />
				<span className="sidebar-item--text">{props.text}</span>
			</div>
		);
	} else {
		return (
			<div className="sidebar-item" onClick={props.onClick}>
				{props.children}
			</div>
		);
	}
};

export default SidebarItem;
