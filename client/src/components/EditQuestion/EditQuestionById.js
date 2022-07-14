import React, { useState, useEffect } from "react";
import "./EditQuestionById.css";
import RichText from "../TextEditor/RichText";
import { useParams } from "react-router-dom";

const api = "/api";
const EditQuestionById = () => {
const { id } = useParams();
const [editQuestionValues, setEditQuestionValues] = useState({
	title: "",
	triedContent: "",
	expectedContent: "",
});

const onSetEditQuestionValues = (name, value) => {
	setEditQuestionValues({ ...editQuestionValues, [name]: value });
};

const saveQuestion = () => {
	fetch(`${api}/questions`, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},

		method: "PATCH",
		body: JSON.stringify({
			id,
			title: editQuestionValues.title,
			tried_content: editQuestionValues.triedContent,
			expected_content: editQuestionValues.expectedContent,
		}),
	}).then(()=> {
		alert("Success: Your question has been updated successfully");
		window.location.replace(`/question/${id}`);
	});
};



const getQuestions = () => {
	console.log("here");
	fetch(`${api}/questions/${id}`)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			setEditQuestionValues({
				title: data[0].title,
				triedContent: data[0].tried_content,
				expectedContent: data[0].expected_content,
				id: data[0].id,
			});
		});
};

useEffect(() => {
	getQuestions();
}, [id]);

	if (editQuestionValues.id) {
		return (
			<form>
				<div className="form-group">
					<label htmlFor="title">Title: </label>
					<input
						className="form-control d-block"
						type="text"
						value={editQuestionValues.title}
						onChange={(e) => onSetEditQuestionValues("title", e.target.value)}
					></input>
				</div>
				<div className="form-group">
					<label htmlFor="expectedOutcome"> I expected to: </label>
					<RichText
						onChange={(value) =>
							onSetEditQuestionValues("expectedContent", value)
						}
						defaultContent={editQuestionValues.expectedContent}
					/>
				</div>
				<label htmlFor="triedOutcome"> I have tried: </label>
				<RichText
					onChange={(value) => onSetEditQuestionValues("triedContent", value)}
					defaultContent={editQuestionValues.triedContent}
				/>
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

	return null;
};

export default EditQuestionById;
