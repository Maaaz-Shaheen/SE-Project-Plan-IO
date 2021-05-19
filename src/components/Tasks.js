import React from "react";
import SplitView from "./SplitView";
import TasksLeft from "./TasksLeft";
import TasksMiddle from "./TasksMiddle";
import TasksRight from "./TasksRight";
import { connect } from "react-redux";
import { setProjectFilterAction, setInboxFilterAction } from "../actions/filters";
// main component

class Tasks extends React.Component {
	// state = {
	// 	projectID: useParams().id,
	// };

	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.setProjectFilter(this.props.match.params.id);
		} else if (this.props.match.path === "/inbox") {
			this.props.setInboxFilter(true);
			// console.log(true);
		} else {
			this.props.setProjectFilter("");
			this.props.setInboxFilter(false);
		}
	}

	render() {
		// const isProjectTask = useParams().id !== "/tasks";
		return (
			<div>
				<SplitView
					left={<TasksLeft projectID={this.props.match.params.id} />}
					middle={<TasksMiddle />}
					right={<TasksRight />}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setProjectFilter: (projectFID) => dispatch(setProjectFilterAction(projectFID)),
		setInboxFilter: (bool) => dispatch(setInboxFilterAction(bool)),
	};
};

export default connect(undefined, mapDispatchToProps)(Tasks);
