import React, { useState } from "react";
import MoreInfoSection from "./MoreInfoSection";
import { startAddContextAction, startEditContextAction } from "../actions/contexts";
import { editDataNewStateAction, resetEditStateAction } from "../actions/states";
import { connect } from "react-redux";
import { taskByFID } from "../selectors/tasks";
import { Form, Button } from "react-bootstrap";

const ContextsRight = (props) => {
	const [warning, setWarning] = useState(false);
	const onTextChange = (e) => {
		const newState = {
			...props.moreInfo,
		};
		newState.data.contextText = e.target.value;
		props.setEditState(newState);
	};

	const saveContext = () => {
		console.log(props.moreInfo);

		let checkContext = true;

		for (let i = 0; i < props.contexts.length; i++) {
			const context = props.contexts[i];

			if (
				context.contextData.contextText === props.moreInfo.data.contextText &&
				context.key !== props.moreInfo.fid
			) {
				checkContext = false;
				break;
			}
		}

		if (!checkContext) {
			setWarning(true);
			return;
		}
		setWarning(false);

		if (props.moreInfo.fid === "") {
			props.addContext({ ...props.moreInfo.data });
		} else {
			const editedContext = {
				key: props.moreInfo.fid,
				contextData: {
					...props.moreInfo.data,
				},
			};
			props.editContext(editedContext, props.moreInfo.fid);
		}
		props.resetEditState();
	};
	return (
		<MoreInfoSection
			placeHolderText="Select a context for more details"
			showEditable={props.moreInfo.editState}
		>
			<div className="right">
				<div>
					<div className="right-title">
						Title:
						<Form.Control
							value={props.moreInfo.data.contextText}
							onChange={onTextChange}
						/>
						{/* <Form.Control value={props.moreInfo.data.contextText} onChange={onTextChange} /> */}
					</div>
					{warning && <p>You cannot have two contexts with the same name!</p>}
				</div>
				<Button
					size="lg"
					variant="success"
					onClick={saveContext}
					// disabled={!props.moreInfo.data.contextText}
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
		contexts: state.contexts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addContext: (contextData) => dispatch(startAddContextAction(contextData)),
		editContext: (context, FID) => dispatch(startEditContextAction(context, FID)),
		setEditState: (newState) => dispatch(editDataNewStateAction(newState)),
		resetEditState: () => dispatch(resetEditStateAction()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextsRight);
