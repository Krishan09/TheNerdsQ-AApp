import React from "react";

const Notloggedin = ({ setShow }) => {
	return (
		<div>
			<p>Please log in first to Ask Questions</p>
			<button onClick={setShow}>ok</button>
		</div>
	);
};

export default Notloggedin;
