import React from "react";

const MoreInfoSection = (props) => {
	return (
		<div className="moreInfoSection">
			{props.showEditable ? (
				{ ...props.children }
			) : (
				<p className="moreInfoSection-placeholderText">{props.placeHolderText}</p>
			)}
		</div>
	);
};

export default MoreInfoSection;
