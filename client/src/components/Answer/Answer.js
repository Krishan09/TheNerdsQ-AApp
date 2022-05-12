import React from "react";
import "./Answer.css";
import DOMPurify from "dompurify";
const createMarkup  = (html) => {
	return {
		__html: DOMPurify.sanitize(html),
	};
};

function Answer({ data }) {
  return (
		<div
			className="subAnswersFormat overflow-auto"
		>
			{data.map((answer) => {
				return (
					<div key={answer.id} className="card mb-3 p-3 answer-wrapper">
						<div dangerouslySetInnerHTML={createMarkup(answer.content)}>
						</div>
						<div className="btn-wrapper">
							<button className="btn btn-link">Edit</button>
							<button className="btn btn-link">
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