import React from "react";
import { InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ContextsListItems = (props) => {
	return (
		<div>
			<InputGroup size="lg" className="tasksListItems">
				<div className="tasksListItems-left">
					{/* <InputGroup.Prepend>Test</InputGroup.Prepend> */}
					<div className="tasksListItems-text">{props.context.contextText}</div>
				</div>
				<InputGroup.Append>
					<Button variant="outline-primary" onClick={props.editContext}>
						<FontAwesomeIcon icon={faEdit} />
					</Button>
					<Button variant="outline-danger" onClick={props.deleteContext}>
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

export default ContextsListItems;
