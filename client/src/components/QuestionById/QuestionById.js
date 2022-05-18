import React, { useState, useEffect } from "react";
import "./QuestionById.css";
import DOMPurify from "dompurify";

const api = "/api";
const QuestionById = ({ questionId }) => {
	const [question, setQuestion] = useState(null);

	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

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
				<h3 className="hide-btn">{question[0].title}</h3>
				<p
					dangerouslySetInnerHTML={createMarkup(question[0].tried_content)}
				></p>
				<p
					dangerouslySetInnerHTML={createMarkup(question[0].expected_content)}
				></p>
			</form>
		) : null;
};

export default QuestionById;