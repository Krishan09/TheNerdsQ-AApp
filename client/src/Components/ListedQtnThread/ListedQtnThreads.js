import React, { useState } from "react";
import Question from "../Question/Question.js";
import "./ListedQtnThread.css";

const ListedQtnThread = () => {
	const [questionsData, setQuestionData] = useState(null);

	return questionsData ? (
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
					</div>
				);
			})}
		</div>
	) : null;
};

export default ListedQtnThread;