import React, { useState, useEffect } from "react";
import "./QuestionById.css";
import DOMPurify from "dompurify";
import RichText from "../TextEditor/RichText";

const api = "/api";
const QuestionById = ({ questionId, editMode }) => {
	const [question, setQuestion] = useState(null);

	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	const getQuestions = () => {
		fetch(`${api}/questions/${questionId}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => toggleMode(data));
	};
	useEffect(() => {
		getQuestions();
	}, [questionId]);

	const [expectedContent, setExpectedContent] = useState("");
	const [triedContent, setTriedContent] = useState("");
	const [title, setTitle] = useState("");
	const saveQuestion = () => {
		fetch(`${api}/questions`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			method: "PATCH",
			body: JSON.stringify({
				id: questionId,
				title: title,
				tried_content: triedContent,
				expected_content: expectedContent,
			}),
		}).then(getQuestions);
	};
	const toggleMode = (data) => {
		setQuestion(data);
		if (data) {
			console.log(data);
		setTriedContent(data[0].tried_content);
		setExpectedContent(data[0].expected_content);
		setTitle(data[0].title);

		}
	};

	if (question) {
		if (!editMode) {
			return (
				<form className="questionByIdStyle">
					<h3 className="hide-btn">{question[0].title}</h3>
					<p
						dangerouslySetInnerHTML={createMarkup(question[0].tried_content)}
					></p>
					<p
						dangerouslySetInnerHTML={createMarkup(question[0].expected_content)}
					></p>
				</form>
			);
		} else {
			return (
				<form>
					{" "}
					<input
						className="form-control d-block mb-3"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></input>
					<RichText
						onChange={setExpectedContent}
						defaultContent={expectedContent}
					/>
					<RichText onChange={setTriedContent} defaultContent={triedContent} />
					<button
						className="btn mt-3 mb-4 btn-outline-warning"
						type="button"
						onClick={saveQuestion}
					>
						saveQuestion
					</button>
				</form>
			);
		}
	}

	return null;
};

export default QuestionById;
