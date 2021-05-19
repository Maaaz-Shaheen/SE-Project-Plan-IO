import React from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TasksListItems = (props) => {
	return (
		<div>
			<InputGroup size="lg" className="tasksListItems">
				<div className="tasksListItems-left">
					<InputGroup.Prepend>
						<InputGroup.Checkbox
							size="lg"
							aria-label="Checkbox for following text input"
							onChange={props.handleCheck}
							checked={props.task.completed}
						/>
					</InputGroup.Prepend>
					<div className="tasksListItems-text">{props.task.taskText}</div>
				</div>
				<InputGroup.Append>
					<Button variant="outline-primary" onClick={props.editTask}>
						<FontAwesomeIcon icon={faEdit} />
					</Button>
					<Button variant="outline-danger" onClick={props.deleteTask}>
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

export default TasksListItems;
