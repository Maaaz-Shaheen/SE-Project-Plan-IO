import React from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { toggleContextFilterModalAction } from "../actions/modal";
import { setContextFilterAction } from "../actions/filters";
import { connect } from "react-redux";

const ContextFilterModal = (props) => {
	const handleCheck = (e, FID) => {
		const selectedContexts = {
			...props.filters.selectedContexts,
		};

		selectedContexts[FID] = e.target.checked;

		props.setContextsFilters(selectedContexts);
		// setTaskContexts(myContexts);
	};

	console.log(props.contexts);
	return (
		<Modal
			show={props.modal.showContextFilterModal}
			animation={false}
			onHide={props.toggleModal}
			dialogClassName="myModal"
		>
			<Modal.Header closeButton className="myModal-title">
				<Modal.Title>
					<span> Select Contexts</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="myModal-contextsBody">
				{props.contexts.map((context, i) => {
					return (
						<label key={context.key}>
							<input
								className="myModal-checkBox"
								type="checkbox"
								checked={props.filters.selectedContexts[context.key]}
								onChange={(e) => handleCheck(e, context.key)}
							/>
							<span>{context.contextData.contextText}</span>
						</label>
					);
				})}
			</Modal.Body>
		</Modal>
	);
};

const mapStateToProps = (state) => {
	return {
		modal: state.modal,
		contexts: state.contexts,
		filters: state.filters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleModal: () => dispatch(toggleContextFilterModalAction()),
		setContextsFilters: (selectedContexts) =>
			dispatch(setContextFilterAction(selectedContexts)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextFilterModal);
