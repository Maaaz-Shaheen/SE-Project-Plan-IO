import React from "react";
import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";
import { addNewMoreInfoAction } from "../actions/states";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProjectsLeft = (props) => {
	const addNewProject = () => {
		const project = {
			projectText: "",
		};
		props.addNewProject(project);
	};
	return (
		<Sidebar>
			<SidebarItem
				icon={faPlus}
				text={"Add New Project"}
				onClick={addNewProject}
			></SidebarItem>
		</Sidebar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewProject: (project) => dispatch(addNewMoreInfoAction(project)),
	};
};

export default connect(undefined, mapDispatchToProps)(ProjectsLeft);
