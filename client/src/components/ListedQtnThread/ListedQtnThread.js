import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Question from "../Question/Question";
import "./ListedQtnThread.css";
import { useSelector } from "react-redux";


const api = "/api";
const ListedQtnThread = () => {
	const[questionsData, setQuestionData] = useState(null);
	const { userId } = useSelector((state) => state);
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

    return questionsData?(
			<div className="listedQtnThreadFormat">
				{questionsData.map((question) => {
					return (
						<div key={question.id} className="question-container">
							<Link className="question-box" to={`/question/${question.id}`}>
								<span>
									<Question data={question} />
								</span>
							</Link>
							{userId === question.user_id && (
								<div id={question.id} className="btn-wrapper">
									<Link
										className="edit-btn btn btn-outline-warning"
										to={`/question/edit/${question.id}`}
									>
										Edit
									</Link>
									<button
										onClick={() => {
											handleDelete(question.id);
										}}
										className="delete-btn btn btn-outline-danger"
									>
										Delete
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>
		): null;
};

export default ListedQtnThread;