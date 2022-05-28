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
			// .then(() => toggleMode());
	};
	useEffect(() => {
		getQuestions();
	}, [questionId]);

	//const [viewMode, setViewMode] = useState(true);
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
		console.log(data);
		if (data) {
			console.log(data);
		setTriedContent(data[0].tried_content);
		setExpectedContent(data[0].expected_content);
		setTitle(data[0].title);

		}
		
		// 	setViewMode(!viewMode);
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

				// <form className="questionByIdStyle">
				// 	<h3 className="hide-btn">{question[0].title}</h3>
				// 	<p>{question[0].content}</p>
				// 	<button type="button" onClick={toggleMode}>
				// 		Edit
				// 	</button>
				// </form>
			);
		} else {
			return (
				<form>
					{" "}
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></input>
					<textarea
						type="text"
						value={expectedContent}
						onChange={(e) => setExpectedContent(e.target.value)}
					></textarea>

                   <textarea
						type="text"
						value={triedContent}
						onChange={(e) => setTriedContent(e.target.value)}
					></textarea>
                     



					{/* <button type="button" onClick={toggleMode}>
						Cancel
					</button> */}
					<button type="button" onClick={saveQuestion}>
						saveQuestion
					</button>
				</form>
			);
		}
	}

	return null;

	// useEffect(() => {
	// 	fetch(`${api}/questions/${questionId}`)
	// 			.then((res) => {
	// 				if (res.ok) {
	// 					return res.json();
	// 				}
	// 			})
	// 			.then((data) => setQuestion(data));
	// 	}, [questionId]);

	return question ? (
		<form className="questionByIdStyle">
			<h3 className="hide-btn">{question[0].title}</h3>
			<p dangerouslySetInnerHTML={createMarkup(question[0].tried_content)}></p>
			<p
				dangerouslySetInnerHTML={createMarkup(question[0].expected_content)}
			></p>
		</form>
	) : null;
};

export default QuestionById;
