import React, { useEffect, useState } from "react";
import "./Question.css";

const api = "/api";
function Question({ data }) {
	const [answers, setAnswers] = useState({});
	const [category, setCategory] = useState(
		[data.category]
			.toString()
			.slice(1, -1)
			.split(",")
			.map((x) => x.slice(1, -1))
			.join(" ")
			.split(" ")
	);

	useEffect(() => {
	fetch(`${api}/answers/${data.id}`)
			.then((res) => res.json())
			.then((data) => setAnswers(data))
			.catch((err) => console.error(err));
	}, [data.id]);

    return (
			<>
				{data.title !== "Question title" && (
					<div className="questionStyle card m-3">
						<h4 className="card-title">{data.title}</h4>
						{/* <div className="arrow.right"></div> */}
						<div className="subQtnStyle card-text">
							<h6>
								{answers.length === 0
									? `${answers.length} Answer`
									: answers.length === 1
									? `${"0" + answers.length} Answer`
									: `${
											answers.length < 10
												? "0" + answers.length + " " + "Answers"
												: answers.length + " " + "Answers"
									}`}
							</h6>
							{category.join("").slice(1, -1).length === 0
								? ""
								: category.map((x, index) => (
										<span className="categoryStyle" key={index}>
											{x}
										</span>
								))}
						</div>
					</div>
				)}
			</>
		);
}


export default Question;