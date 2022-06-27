import React, { useState, useEffect } from "react";
import "./QuestionById.css";
import DOMPurify from "dompurify";
import RichText from "../TextEditor/RichText";


const QuestionById = ({ question, editMode,editQuestionValues,onSetEditQuestionValues,saveQuestion }) => {
	
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};


	if (question) {
		if (!editMode) {
			return (
				<form className="questionByIdStyle">
					<h3 className="hide-btn">{question[0].title}</h3>
					<p
						dangerouslySetInnerHTML={createMarkup(question[0].tried_content)}
					></p>
					<p
						dangerouslySetInnerHTML={createMarkup(question[0].expected_content)}
					></p>
				</form>
			);
		} else {
			return (
				<form>
					{" "}
					<input
						className="form-control d-block mb-3"
						type="text"
						value={editQuestionValues.title}
						onChange={(e) =>onSetEditQuestionValues("title",e.target.value)}
					></input>
					<RichText
						onChange={(value) =>onSetEditQuestionValues("expectedContent",value)}
						defaultContent={editQuestionValues.expectedContent}
					/>
					<RichText onChange={(value) =>onSetEditQuestionValues("triedContent",value)} defaultContent={editQuestionValues.triedContent} />
					<button
						className="btn mt-3 mb-4 btn-outline-warning"
						type="button"
						onClick={saveQuestion}
					>
						saveQuestion
					</button>
				</form>
			);
		}
	}

	return null;
};

export default QuestionById;
