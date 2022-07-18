import React, { useEffect, useState } from "react";
import "./Question.css";
import DOMPurify from "dompurify";
import arrowRight from "../../pages/arrow-right.png";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import * as updateLocale from "dayjs/plugin/updateLocale";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);


const api = "/api";
function Question({ data }) {
	const [answers, setAnswers] = useState({});
	const { userName } = useSelector((state) => state);
	const [category, setCategory] = useState(
		[data.category]
			.toString()
			.slice(1, -1)
			.split(",")
			.map((x) => x.slice(1, -1))
			.join(" ")
			.split(" ")
	);
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

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
						<div className="question-section-1">
							<h3 className="card-title">{data.title}</h3>
							<h4>I have tried:</h4>
							<p dangerouslySetInnerHTML={createMarkup(data.tried_content)}></p>
							<h4>I expected to:</h4>
							<p
								dangerouslySetInnerHTML={createMarkup(data.expected_content)}
							></p>
							<span>Created: {dayjs(data.created_at).fromNow()} by {data.username}</span>
						</div>
						<div className="question-section-2">
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
							<img src={arrowRight} alt="arrowRight" width="40px" />
							<div className="subQtnStyle card-text">
								{category.join("").slice(1, -1).length === 0
									? ""
									: category.map((x, index) => (
											<span className="categoryStyle" key={index}>
												{x}
											</span>
									))}
							</div>
						</div>
					</div>
				)}
			</>
		);
}


export default Question;