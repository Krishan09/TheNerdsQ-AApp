import React, { useState } from "react";
//import Tags from "../../components/Tags/Tags";
import "./AskQuestionForm.css";

const api = process.env.API_URL || "/api";
const AskQuestionForm = ({ show }) => {

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState([]);
	const [hide, setHide] = useState("");

//Post a question
	const onSubmitQuestion = async(e) => {
		e.preventDefault();
		try {
			const body = { category, title, content };
			const response = await fetch(`${api}/question`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			console.log(response);
		} catch(err) {
			console.error(err.message);
		}
	};
//Add a category
	const addCategory = (e) => {
		if (e.key === "Enter") {
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
		setHide(!hide);
		window.location.reload(true);
	};

//hide the ask question form
	const handleHide = (e) => {
		e.preventDefault();
		setHide(!hide);
		window.location.reload(true);
	};
	return (
		<div className={show ? "show" : ""}>
			{/* <div className="askQtn-banner">
				<h1>Writing a good question</h1>
				<p>
					You’re ready to ask a programming-related question and this form will
					help guide you through the process.
				</p>
				<p>
					Looking to ask a non-programming question? See the topics here to find
					a relevant site.
				</p>
				<ul>
					<span>Steps</span>
					<li>Summarize your problem in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>
						Add “tags” which help surface your question to members of the
						community.
					</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</div> */}
			<form
				className="askQuestionStyle form-group card"
				onSubmit={onSubmitQuestion}
			>
				<button
					type="button"
					className="AskQtnCloseBtn close"
					aria-label="Close"
					onClick={handleHide}
				>
					<span aria-hidden="true">&times;</span>
				</button>
				<label htmlFor="title">Title</label>
				<input
					className="form-control"
					type="text"
					id="title"
					name="title"
					placeholder="Which problem are you trying to solve?"
					autoComplete="off"
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label htmlFor="expectedOutcome">Body</label>
				<textarea
					className="form-control"
					type="text"
					rows={5}
					cols={5}
					placeholder="Elaborate on your issue"
					onChange={(e) => setContent(e.target.value)}
					required
				/>
				<div className="categories">
					<label htmlFor="expectedOutcome">Category</label>
					<div className="tag-card">
						<div className="tag-container">
							{category.map((tag, index) => {
								return (
									<div key={index} className="tag">
										{tag}
										<span
											role="button"
											tabIndex={0}
											onClick={() => removeCategory(tag)}
											aria-hidden="true"
										>
											x
										</span>
									</div>
								);
							})}
							<input
								type="text"
								className="tag-input"
								placeholder="HTML, CSS, Node, React, JavaScript, Postgresql"
								onKeyDown={addCategory}
							/>
						</div>
					</div>
				</div>
				<div className="btn-wrapper">
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
		</div>
	);
};


export default AskQuestionForm;
