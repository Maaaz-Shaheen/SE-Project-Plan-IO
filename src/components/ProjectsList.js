import React from "react";
import ProjectsListItems from "./ProjectsListItems";
import { startDeleteProjectAction, startEditProjectAction } from "../actions/projects";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import filteredTasks from "../selectors/tasks";

class ProjectsList extends React.Component {
	state = {
		loadingPara: "No projects found!",
		loaded: false,
	};

	deleteProject = (project, FID) => {
		// console.log(key);
		if (this.props.moreInfo.fid === FID) {
			this.props.resetEditState();
		}
		this.props.deleteProject(project, FID);
	};

	setEditState = (i, fid) => {
		const newState = {
			editState: true,
			fid,
			data: {
				...this.props.moreInfo.data,
				...this.props.projects[i].projectData,
			},
		};
		this.props.setEditState(newState);
	};

	render() {
		// console.log(this.props.moreInfo);
		return this.props.projects.length > 0 ? (
			<div className="tasksList">
				{this.props.projects.map((project, i) => {
					console.log(project);
					return (
						<ProjectsListItems
							project={project.projectData}
							key={project.key}
							FID={project.key}
							deleteProject={() => this.deleteProject(project, project.key)}
							editProject={() => this.setEditState(i, project.key)}
						/>
					);
				})}
			</div>
		) : (
			<p className="tasksList-loadingPara">{this.state.loadingPara}</p>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects,
		// tasks: filteredTasks(state.projects, state.filters),
		moreInfo: state.moreInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteProject: (task, FID) => dispatch(startDeleteProjectAction(task, FID)),
		editProject: (task, FID) => dispatch(startEditProjectAction(task, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
