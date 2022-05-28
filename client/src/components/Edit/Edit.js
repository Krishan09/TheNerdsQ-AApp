import React, { useState, useEffect } from "react";


const api = "/api";
const Edit = ({ questionId, setQuestion, question }) => {
	const [viewMode, setViewMode] = useState(true);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const getQuestions = () => {
		fetch(`${api}/questions/${questionId}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => setQuestion(data))
			.then(() => setViewMode(true));
	};

	useEffect(() => {
		getQuestions();
	});

	const saveQuestion = () => {
		fetch(`${api}/questions`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},

			method: "PATCH",
			body: JSON.stringify({ id: questionId, title: title, content: content }),
		}).then(getQuestions);
	};

	const toggleMode = () => {
		setContent(question[0].content);
		setTitle(question[0].title);
		setViewMode(!viewMode);
	};

	if (question) {
		if (viewMode) {
			return (
				<form className="questionByIdStyle card">
					<h3 className="hide-btn">{question[0].title}</h3>
					<p>{question[0].content}</p>
					<button type="button" onClick={toggleMode}>
						Edit
					</button>
				</form>
			);
		} else {
			return (
				<form className="card">
					{" "}
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					></input>
					<textarea
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
					<button type="button" onClick={toggleMode}>
						Cancel
					</button>
					<button type="button" onClick={saveQuestion}>
						saveQuestion
					</button>
				</form>
			);
		}
	}

	// return null;
};

export default Edit;

//  <button className="edit-btn btn btn-outline-warning"
// 									// onClick={() => {
// 									// 	handleEdit(question.id);
// 									// }}
// 								>
// 									Edit
// 								</button>

// <Edit questionId={question.id} />;

// const handleEdit = async (id) => {
// 	try {
// 		const body = { content };
// 		await fetch(`${api}/question/${id}`, {
// 			method: "put",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(body),
// 		});
// 		window.location = "/";
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };