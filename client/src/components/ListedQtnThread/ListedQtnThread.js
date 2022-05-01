import React, { useState, useEffect } from "react";
import Question from "../Question/Question.js";
//import { questionsData } from "../../mock/data.js";
import "./ListedQtnThread.css";

const api = "/api";
const ListedQtnThread = ({ onPressQuestion, questionId }) => {
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

	const handleDelete = (e) => {
		e.preventDefault;
		fetch(`${api}/questions/${questionId}`, { method: "DELETE" })
			.then((res) => res.json())
			.catch((err) => console.error(err));
	};
	// const handleDelete = () => {
	// 	fetch(`${api}/questions/${questionId}`)
	// 	.then((res) => res.json())
	// 	.catch((err) => console.error(err));
	// };

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
							<div className="btn-wrapper">
								<button className="edit-btn btn btn-outline-dark">Edit</button>
								<button
									id={question.id}
									onClick={handleDelete}
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