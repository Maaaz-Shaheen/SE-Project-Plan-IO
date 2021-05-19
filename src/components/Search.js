import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setTextFilterAction, setContextFilterAction } from "../actions/filters";
import { toggleContextFilterModalAction, toggleSortByPriorityModalAction } from "../actions/modal";

class Search extends React.Component {
	state = {
		userInput: "",
	};

	setUserInput = (e) => {
		const userInput = e.target.value;
		this.setState(() => ({
			userInput,
		}));
		this.props.setTextFilter(e.target.value);
	};

	setContextFilters = () => {
		const selectedContexts = {
			...this.props.filters.selectedContexts,
		};
		this.props.contexts.forEach((context) => {
			if (!selectedContexts[context.key]) {
				selectedContexts[context.key] = false;
			}
		});
		// console.log(selectedContexts);
		// console.log("myContexts", this.props.contexts);
		this.props.setContextsFilters(selectedContexts);
		this.props.toggleContextModal();
	};

	render() {
		return (
			<div className="search">
				<Form.Control
					type="text"
					name="userText"
					placeholder="Type to search"
					value={this.state.userInput}
					onChange={this.setUserInput}
					className="search-input"
				/>
				<Button className="search-btn" onClick={this.setContextFilters}>
					Filter by context
				</Button>
				<Button className="search-btn" onClick={this.props.togglePriorityModal}>
					Sort by priority
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
		editData: state.editData,
		contexts: state.contexts,
		filters: state.filters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTextFilter: (searchTerm) => dispatch(setTextFilterAction(searchTerm)),
		setContextsFilters: (selectedContexts) =>
			dispatch(setContextFilterAction(selectedContexts)),
		toggleContextModal: () => dispatch(toggleContextFilterModalAction()),
		togglePriorityModal: () => dispatch(toggleSortByPriorityModalAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
