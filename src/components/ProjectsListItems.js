import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProjectsListItems = (props) => {
	return (
		<div>
			<InputGroup size="lg" className="tasksListItems">
				<div className="tasksListItems-left">
					{/* <InputGroup.Prepend>Project</InputGroup.Prepend> */}
					<div className="tasksListItems-text">{props.project.projectText}</div>
				</div>
				<InputGroup.Append>
					<Button
						variant="success"
						className="project-open-btn"
						as={Link}
						to={`/projects/${props.FID}`}
					>
						Open
						{/* <Link to={`/projects/${props.FID}`} as={Button} variant="primary">
					</Link> */}
					</Button>
					<Button variant="outline-primary" onClick={props.editProject}>
						<FontAwesomeIcon icon={faEdit} />
					</Button>
					<Button variant="outline-danger" onClick={props.deleteProject}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</Button>
				</InputGroup.Append>
			</InputGroup>
			{/* {props.task}
			<button onClick={props.editTask}>Edit</button>
			<button onClick={props.deleteTask}>Delete</button> */}
		</div>
	);
};

export default ProjectsListItems;
