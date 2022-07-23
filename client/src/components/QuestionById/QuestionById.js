import React from "react";
import { Link } from "react-router-dom";
import "./QuestionById.css";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";



const api = "/api";

const QuestionById = ({ question, questionId }) => {
const { userId } = useSelector((state) => state);

const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`${api}/question/${id}`, { method: "DELETE" });
			window.location.replace("/");
		} catch (err) {
			console.error(err.message);
		}
	};

	if (question) {
			return (
				<>
					<div className="questionByIdStyle">
						<h2>Question: </h2>
						<h3>{question[0].title}</h3>
						<h5>I have tried to: </h5>
						<p
							dangerouslySetInnerHTML={createMarkup(question[0].tried_content)}
						></p>
						<h5>I expected to: </h5>
						<p
							dangerouslySetInnerHTML={createMarkup(
								question[0].expected_content
							)}
						></p>
					</div>
					<div>
						{userId === question[0].user_id && (
							<div className="btn-wrapper">
								<Link
									className="edit-btn btn btn-outline-warning"
									to={`/question/edit/${questionId}`}
								>
									Edit
								</Link>
								<button
									onClick={() => {
										handleDelete(questionId);
									}}
									className="delete-btn btn btn-outline-danger"
								>
									Delete
								</button>
							</div>
						)}
					</div>
				</>
			);
		}

	return null;
};

export default QuestionById;
