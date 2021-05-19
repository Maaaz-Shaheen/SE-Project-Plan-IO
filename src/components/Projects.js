import React from "react";
import SplitView from "./SplitView";
import ProjectsLeft from "./ProjectsLeft";
import ProjectsMiddle from "./ProjectsMiddle";
import ProjectsRight from "./ProjectsRight";

// main component

const Projects = () => {
	return (
		<div>
			<SplitView
				left={<ProjectsLeft />}
				middle={<ProjectsMiddle />}
				right={<ProjectsRight />}
			/>
		</div>
	);
};

export default Projects;
