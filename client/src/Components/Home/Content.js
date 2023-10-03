import React from "react";
import Recent from "./Recent.js";
import Shared from "./Shared.js"; 
import Contributions from "./Contributions.js";
import Repositories from "./Repositories.js";
import CodeSpaces from "./CodeSpaces.js";
import Deleted from "./Deleted.js";
import Drafts from "./Drafts.js";

function Content({ selectedOption }) {
	let content;

	switch (selectedOption) {
		case 'recent':
			content = <Recent />;
			break;
		case 'shared':
			content = <Shared />;
			break;
		case 'contributions':
			content = <Contributions />;
			break;
		case 'respositories':
			content = <Repositories />;
			break;
		case 'drafts':
			content = <Drafts />;
			break;
		case 'codespaces':
			content = <CodeSpaces />;
			break;
		case 'deleted':
			content = <Deleted />;
			break;
		default:
			content = "Loading..."

	}

	return content
}

export default Content;