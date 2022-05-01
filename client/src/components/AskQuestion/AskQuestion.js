import React, { useState } from "react";
import "./AskQuestion.css";

const AskQuestion = ({ show }) => {
	const [hide, setHide] = useState(false);
	const handleHide = (e) => {
		e.preventDefault();
		setHide(!hide);
		window.location.reload(true);
	};
    return (
			<div className={show ? "show" : ""}>
				<form className="askQuestionStyle form-group card">
					<button type="button" className="AskQtnCloseBtn" onClick={handleHide}>
						<span aria-hidden="true">×</span>
					</button>
					<label htmlFor="title">Which problem are you trying to solve?</label>
					<input className="form-control" type="text" id="title" name="title" />
					<label htmlFor="expectedOutcome">
						What was your expected outcome?
						<textarea className="form-control" type="text" rows={2} cols={5} />
					</label>
					<label htmlFor="actualOutcome">
						What is your actual outcome?
						<textarea
							className="form-control"
							type="text"
							id="outcome"
							rows={2}
							cols={5}
						/>
					</label>
					<label htmlFor="errorMessage">
						Post your code or the error you are getting:
						<textarea
							className="form-control"
							type="text"
							id="lname"
							rows={2}
							cols={5}
						/>
					</label>
					<button className="btn btn-danger">Ask question</button>
				</form>
			</div>
		);

};

export default AskQuestion;