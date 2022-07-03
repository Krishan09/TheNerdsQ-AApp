import React from "react";
import "./Answer.css";
import DOMPurify from "dompurify";
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




function Answer({ data,getAnswers }) {
	return (
		<div className="subAnswersFormat overflow-auto">
			{data.map((answer) => {
				return (
					<div key={answer.id} className="card mb-3 p-3 answer-wrapper">
						<div dangerouslySetInnerHTML={createMarkup(answer.content)}></div>
						<div className="btn-wrapper">
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
