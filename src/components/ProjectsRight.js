import React from "react";
import MoreInfoSection from "./MoreInfoSection";
import { startAddProjectAction, startEditProjectAction } from "../actions/projects";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import { taskByFID } from "../selectors/tasks";
import { Form, Button } from "react-bootstrap";

const ProjectsRight = (props) => {
	const onTextChange = (e) => {
		const newState = {
			...props.moreInfo,
		};
		newState.data.projectText = e.target.value;
		props.setEditState(newState);
	};

	const saveProject = () => {
		console.log(props.moreInfo);
		if (props.moreInfo.fid === "") {
			props.addProject({ ...props.moreInfo.data });
		} else {
			const editedProject = {
				key: props.moreInfo.fid,
				projectData: {
					...props.moreInfo.data,
				},
			};
			props.editProject(editedProject, props.moreInfo.fid);
		}
		props.resetEditState();
	};
	return (
		<MoreInfoSection
			placeHolderText="Select a project for more details"
			showEditable={props.moreInfo.editState}
		>
			<div className="right">
				<div>
					<div className="right-title">
						Title:
						<Form.Control
							value={props.moreInfo.data.projectText}
							onChange={onTextChange}
						/>
						{/* <Form.Control value={props.moreInfo.data.contextText} onChange={onTextChange} /> */}
					</div>
				</div>
				<Button
					size="lg"
					variant="success"
					onClick={saveProject}
					disabled={!props.moreInfo.data.projectText}
				>
					Save
				</Button>
			</div>
		</MoreInfoSection>
	);
};

const mapStateToProps = (state) => {
	return {
		task: taskByFID(state.tasks, state.moreInfo.fid),
		moreInfo: state.moreInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addProject: (projectData) => dispatch(startAddProjectAction(projectData)),
		editProject: (project, FID) => dispatch(startEditProjectAction(project, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsRight);
