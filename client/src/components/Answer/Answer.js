import React from "react";
import "./Answer.css";
import DOMPurify from "dompurify";
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

//const handleEdit = async (id)




function Answer({ data, getAnswers }) {
	console.log(data);
	return (
		<div className="subAnswersFormat overflow-auto">
			{data.map((answer) => {
				return (
					<div key={answer.id} className="card mb-3 p-3 answer-wrapper">
						<div className="answer-section-1">
							<p dangerouslySetInnerHTML={createMarkup(answer.content)}></p>
							<span>Responded: {dayjs(answer.created_at).fromNow()}</span>
						</div>
						<div className="answer-section-2">
							<h6>{answer.responder}</h6>
							{/* <button
						//Added edit button on click handler
								className="color-edit btn btn-link"
								onClick={() => {
									handleEdit(answer.id);
								}}
							>
								Edit
							</button> */}
							<button
								className="color-delete btn btn-link"
								onClick={() => {
									handleDelete(answer.id);
									getAnswers();
								}}
							>
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Answer;
