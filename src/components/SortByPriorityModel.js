import React from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { toggleSortByPriorityModalAction } from "../actions/modal";
import { setPriorityOrderAction } from "../actions/filters";
import { connect } from "react-redux";

const SortByPriorityModal = (props) => {
	const onPriorityChange = (e) => {
		// console.log(e.target.value);
		props.setPriorityOrder(e.target.value);
		// const newState = {
		// 	...props.moreInfo,
		// };
		// newState.data.priority = parseInt(e.target.value);
		// props.setEditState(newState);
	};

	console.log(props.contexts);
	return (
		<Modal
			show={props.modal.showSortByPriorityModal}
			animation={false}
			onHide={props.toggleModal}
			dialogClassName="myModal"
		>
			<Modal.Header closeButton className="myModal-title">
				<Modal.Title>
					<span> Select Priority</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="myModal-contextsBody">
				<label htmlFor="choice0">
					<input
						type="radio"
						id="choice0"
						name="priority"
						value="none"
						className="myModal-radio"
						checked={props.filters.order === "none"}
						onChange={onPriorityChange}
					/>
					<span>None</span>
				</label>

				<label htmlFor="choice1">
					<input
						type="radio"
						id="choice1"
						name="priority"
						className="myModal-radio"
						checked={props.filters.order === "ascend"}
						value="ascend"
						onChange={onPriorityChange}
					/>
					<span>Ascending</span>
				</label>

				<label htmlFor="choice2">
					<input
						type="radio"
						id="choice2"
						name="priority"
						className="myModal-radio"
						value="descend"
						checked={props.filters.order === "descend"}
						onChange={onPriorityChange}
					/>
					<span>Descending</span>
				</label>
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
		toggleModal: () => dispatch(toggleSortByPriorityModalAction()),
		setPriorityOrder: (order) => dispatch(setPriorityOrderAction(order)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SortByPriorityModal);
