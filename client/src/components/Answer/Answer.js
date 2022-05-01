//import React, { useState } from "react";
import "./Answer.css";

function Answer({ data, key }) {
	console.log(data);
	// const [answersData, setAnswersData] = useState([data]);
  return (
		<div
			className="subAnswersFormat overflow-auto"
		>
			{/* <p className="p1">
				<strong>{data.owner}</strong>
			</p> */}
			{data.map((answer) => {
				return (
					<div key={key} className="card mb-3 p-3 answer-wrapper">
						<div>
							<p>{answer.content}</p>
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