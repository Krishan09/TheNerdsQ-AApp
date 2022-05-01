import React, { useState, useEffect } from "react";
import Answer from "../Answer/Answer";
//import Reply from "../Reply/Reply";
import "./AnswersByIdThread.css";
//import { questionsData } from "../../mock/data";

const api = "/api";
const AnswersByIdThreads = ({ questionId }) => {
	const [answers, setAnswers] = useState([]);
	const [display, setDisplay] = useState(true);


	useEffect(() => {
		fetch(`${api}/answers/${questionId}`)
			.then((res) => res.json())
			.then((data) => setAnswers(data))
			.catch((err) => console.error(err));
	}, [questionId]);

	const handleDisplay = () => {
		setDisplay(!display);
	};
	return (
		<div>
			<button type="button" className="answer-link btn btn-link" onClick={handleDisplay}>
				Answer(s)
			</button>
			{/* <h4>Answer(s)</h4> */}
			<div className={display? "display": "answersFormat"}>
				<Answer key={questionId} data={answers} display={display} />
			</div>
		</div>
	);
};

export default AnswersByIdThreads;
