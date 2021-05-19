import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { toggleQuickAddModalAction } from "../actions/modal";
import { connect } from "react-redux";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startQuickAddTaskAction } from "../actions/tasks";
// focusable input component
const FocusInput = (props) => {
	const innerRef = useRef();
	useEffect(() => innerRef.current && innerRef.current.focus());

	return <Form.Control ref={innerRef} {...props} />;
};

const QuickAddModal = (props) => {
	const [taskText, setTaskText] = useState("");

	const addTask = (e) => {
		props.addTask(taskText);
		setTaskText("");
		props.toggleModal();
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			addTask();
		}
	};

	return (
		<Modal
			show={props.modal.showQuickAddModal}
			animation={false}
			onHide={props.toggleModal}
			centered
			dialogClassName="myModal"
			onKeyPress={handleKeyPress}
		>
			<Modal.Header closeButton className="myModal-title">
				<Modal.Title>
					<FontAwesomeIcon icon={faBolt} />
					<span> Quick Add</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3" size="lg">
					<FocusInput
						placeholder="Enter task"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						value={taskText}
						onChange={(e) => setTaskText(e.target.value)}
					/>
					<InputGroup.Append>
						<Button variant="primary" onClick={addTask}>
							Add
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Modal.Body>
		</Modal>
	);
};

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModal: () => dispatch(toggleQuickAddModalAction()),
		addTask: (taskText) => dispatch(startQuickAddTaskAction(taskText)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickAddModal);
