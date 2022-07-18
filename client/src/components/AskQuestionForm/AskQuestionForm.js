import React, { useState } from "react";
import RichText from "../TextEditor/RichText";
import "./AskQuestionForm.css";
import DOMPurify from "dompurify";
import Tags from "../Tags/Tags";
import { useSelector } from "react-redux";

const api = "/api";
const AskQuestionForm = () => {
	const [title, setTitle] = useState("");
	const [tried_content, setTried_content] = useState("");
	const [expected_content, setExpected_content] = useState("");
	const [category, setCategory] = useState([]);
	const { userId } = useSelector((state) => state);

//Post a question
	const onSubmitQuestion = async(e) => {
		e.preventDefault();
		try {
			const body = {
				category,
				title,
				tried_content: DOMPurify.sanitize(tried_content),
				expected_content: DOMPurify.sanitize(expected_content),
				userId,
			};
			const response = await fetch(`${api}/question`, {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if(response.ok) {
				alert("Your question has been submitted successfully");
				window.location.reload(true);
			}
		} catch(err) {
			alert("Error, something went wrong, we couldn't submit your question");
		}
	};

//Add a category
	const addCategory = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (e.target.value.length > 0) {
				setCategory([...category, e.target.value]);
				e.target.value = "";
			}
		}
	};
//Remove a Category
	const removeCategory = (removeTag) => {
		const newCategory = category.filter((tag) => tag !== removeTag);
		setCategory(newCategory);
	};

//Cancel a submit question
	const cancelSubmit = (e) => {
		e.preventDefault();
		window.location.replace("/");
	};

	return (
		<form className="askQuestionStyle form-group" onSubmit={onSubmitQuestion}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<i>
					Be specific and imagine you’re asking a question to another person
				</i>
				<textarea
					className="form-control"
					maxLength={300}
					rows="1"
					cols="5"
					type="text"
					id="title"
					name="title"
					placeholder="Which problem are you trying to solve?"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					autoComplete="off"
					required
				></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="triedOutcome">
					What were you trying to do? What is happening?
				</label>
				<i>
					Include all the information someone would need to answer your question
				</i>
				<RichText onChange={setTried_content} value={tried_content} />
			</div>
			<div className="form-group">
				<label htmlFor="expectedOutcome">
					What were you expecting? provide any link?
				</label>
				<i>
					Include all the information someone would need to answer your question
				</i>
				<RichText
					onChange={setExpected_content}
					value={expected_content}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="expectedOutcome">Category</label>
				<i>
					Add up to 5 tags to describe what your question is about then press
					enter
				</i>
				<Tags
					addCategory={addCategory}
					removeCategory={removeCategory}
					category={category}
					setCategory={setCategory}
				/>
			</div>
			<div className="form-group btn-wrapper">
				<button
					type="button"
					className="btn cancelQtn-btn"
					onClick={cancelSubmit}
				>
					Cancel
				</button>
				<button type="submit" className="btn askQtn-btn">
					Ask question
				</button>
			</div>
		</form>
	);
};


export default AskQuestionForm;
