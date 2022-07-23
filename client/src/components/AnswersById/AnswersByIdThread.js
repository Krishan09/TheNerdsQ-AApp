import React, { useState } from "react";
import Answer from "../Answer/Answer";
import "./AnswersByIdThread.css";


const AnswersByIdThreads = ({ questionId,answers,getAnswers }) => {
	const [display, setDisplay] = useState(false);

	const handleDisplay = () => {
		setDisplay(!display);
	};
	return (
		<div>
			<button type="button" className="answer-link btn btn-link" onClick={handleDisplay}>
				{answers.length} Answer(s)
			</button>
			<div className={display? "display": "answersFormat"}>
				<Answer key={questionId} data={answers} display={display} getAnswers={getAnswers} />
			</div>
		</div>
	);
};

export default AnswersByIdThreads;
