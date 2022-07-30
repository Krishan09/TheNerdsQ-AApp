import React, { useState, useEffect } from "react";
import "./Answer.css";
import redLike from "../../pages/red_like.png";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import * as updateLocale from "dayjs/plugin/updateLocale";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

const api = "/api";

const createMarkup = (html) => {
	return {
		__html: DOMPurify.sanitize(html),
	};
};

const handleDelete = async (id) => {
	try {
		await fetch(`${api}/answer/${id}`, { method: "DELETE" });
	} catch (err) {
		console.error(err.message);
	}
};

function Answer({ data, getAnswers }) {
	const { userName } = useSelector((state) => state);
	const [counter, setCounter] = useState(0);
	// const handleCount = () => {
	// 	setCounter((count) => count + 1);
	// };
	const handleCount = () => {
		setCounter((prevCount) => {
			const newCount = Number(prevCount) + 1;
			localStorage.setItem("count", newCount);
			return newCount;
		});
	};
	useEffect(() => {
		const initialValue = localStorage.getItem("count");
		if (initialValue) {
			setCounter(initialValue);
		}
	}, []);

	return (
		<div className="subAnswersFormat overflow-auto">
			{data.map((answer) => {
				return (
					<div key={answer.id} className="card mb-3 p-3 answer-wrapper">
						<div className="answer-section-1">
							<h6>{answer.responder}:</h6>
							<p dangerouslySetInnerHTML={createMarkup(answer.content)}></p>
							<span>Responded: {dayjs(answer.created_at).fromNow()}</span>
						</div>
						<div className="answer-section-2">
							<button onClick={handleCount}>
								<img src={redLike} alt="like" width="40px" />
							</button>
							<span>{counter} like(s)</span>
							{(userName === answer.responder ||
								answer.responder === "Guest") && (
								<button
									className="color-delete btn btn-link p-0"
									onClick={() => {
										handleDelete(answer.id);
										getAnswers();
									}}
								>
									Delete
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Answer;
