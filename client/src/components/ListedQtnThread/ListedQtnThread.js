import React, { useState, useEffect } from "react";
import Question from "../Question/Question.js";
import "./ListedQtnThread.css";

const api = "/api";
const ListedQtnThread = ({ onPressQuestion }) => {
	const[questionsData, setQuestionData] = useState(null);
	useEffect(() => {
		fetch(`${api}/questions`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => setQuestionData(data));
	}, []);

	const handleDelete = async (id) => {
		try {
			await fetch(`${api}/question/${id}`, { method: "DELETE" });
			window.location.reload(true);
		} catch (err) {
			console.error(err.message);
		}
	};
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
	//};

    return questionsData?(
			<div className="listedQtnThreadFormat">
				{questionsData.map((question) => {
					return (
						<div key={question.Id} className="tent">
							<button
								className="tentative"
								onClick={() => onPressQuestion(question.id)}
							>
								<span>
									<Question data={question} />
								</span>
							</button>
							<div id={question.id} className="btn-wrapper">
								<button
									className="edit-btn btn btn-outline-dark"
									// onClick={() => {
									// 	handleEdit(question.id);
									// }}
								>
									Edit
								</button>
								<button
									onClick={() => {
										handleDelete(question.id);
									}}
									className="delete-btn btn btn-outline-danger"
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		): null;
};

export default ListedQtnThread;