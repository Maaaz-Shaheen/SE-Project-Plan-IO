import React from "react";
import ContextsListItems from "./ContextsListItems";
import { startDeleteContextAction, startEditContextAction } from "../actions/contexts";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import filteredTasks from "../selectors/tasks";

class ContextsList extends React.Component {
	state = {
		loadingPara: "No contexts found!",
		loaded: false,
	};

	deleteContext = (context, FID) => {
		// console.log(key);
		if (this.props.moreInfo.fid === FID) {
			this.props.resetEditState();
		}
		this.props.deleteContext(context, FID);
	};

	setEditState = (i, fid) => {
		const newState = {
			editState: true,
			fid,
			data: {
				...this.props.contexts[i].contextData,
			},
		};
		this.props.setEditState(newState);
	};

	render() {
		// console.log(this.props.moreInfo);
		return this.props.contexts.length > 0 ? (
			<div className="tasksList">
				{this.props.contexts.map((context, i) => {
					console.log(context);
					return (
						<ContextsListItems
							context={context.contextData}
							key={context.key}
							deleteContext={() => this.deleteContext(context, context.key)}
							editContext={() => this.setEditState(i, context.key)}
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
		contexts: state.contexts,
		// tasks: filteredTasks(state.contexts, state.filters),
		moreInfo: state.moreInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteContext: (task, FID) => dispatch(startDeleteContextAction(task, FID)),
		editContext: (task, FID) => dispatch(startEditContextAction(task, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextsList);
