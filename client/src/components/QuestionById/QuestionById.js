import React, { useState, useEffect } from "react";
import "./QuestionById.css";
import DOMPurify from "dompurify";

const api = "/api";
const QuestionById = ({ questionId }) => {
	const [question, setQuestion] = useState(null);

	const getQuestions = () =>{
		fetch(`${api}/questions/${questionId}`)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => setQuestion(data))
		.then(()=> setViewMode(true));
	}
	useEffect(() => {
		getQuestions()

		
	}, [questionId]);

	const [viewMode, setViewMode] = useState(true);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
    const saveQuestion = () => {
		fetch(`${api}/questions`, {
			headers: {
				'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},

			method: "PATCH",
			body: JSON.stringify({id:questionId ,title:title, content:content})
		})
		.then(getQuestions)


	}
	const toggleMode = () => {
		setContent(question[0].content);
		setTitle(question[0].title);
		setViewMode(!viewMode);
	};

	if (question) {
		if (viewMode) {
			return (
				<form className="questionByIdStyle">
					<h3 className="hide-btn">{question[0].title}</h3>
					<p>{question[0].content}</p>
					<button type="button" onClick={toggleMode}>
						Edit
					</button>
				</form>
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
					<textarea type= "text" value = {content} onChange = {(e)=> setContent(e.target.value)}></textarea>
					<button type="button" onClick={toggleMode}>
						Cancel
					</button>
					<button type = "button" onClick = {saveQuestion}>saveQuestion</button>
				</form>
			);
		}
	}



	return null;

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
