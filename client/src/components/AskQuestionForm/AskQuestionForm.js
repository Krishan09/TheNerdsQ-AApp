import React, { useState } from "react";
import RichText from "../TextEditor/RichText";
import "./AskQuestionForm.css";

const api = "/api";
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
			await fetch(`${api}/question`, {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch(err) {
			console.error(err.message);
		}
		setTitle("");
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
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					autoComplete="off"
					required
				/>
				<label htmlFor="expectedOutcome">Body</label>
				{/* <textarea
					className="form-control"
					type="text"
					rows={5}
					cols={5}
					placeholder="Elaborate on your issue"
					onChange={(e) => setContent(e.target.value)}
					value={content}
					required
				/> */}
				<RichText onChange={setContent} />
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
