import React, { useState, useEffect } from "react";
import "./QuestionById.css";

const api = "/api";
const QuestionById = ({ questionId }) => {
	const [question, setQuestion] = useState(null);
	useEffect(() => {
		fetch(`${api}/questions/${questionId}`)
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
				})
				.then((data) => setQuestion(data));
		}, [questionId]);

    return question ? (
			<form className="questionByIdStyle">
				<h3 className="hide-btn">
					{ question[0].title }
				</h3>
				<p>{question[0].content}</p>
			</form>
		) : null;
};

export default QuestionById;