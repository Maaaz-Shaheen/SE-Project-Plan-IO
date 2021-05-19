import React from "react";

const SplitView = (props) => {
	return (
		<div className="splitview">
			<div className="splitview-left">{props.left}</div>
			<div className="splitview-middle">{props.middle}</div>
			<div className="splitview-right">{props.right}</div>
		</div>
	);
};

export default SplitView;
