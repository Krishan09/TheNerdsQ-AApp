import React, { useState } from "react";
import "./Tag.css";

const Tags = () => {
	const [tags, setTags] = useState([]);
	const addTag = (e) => {
		if(e.key === "Enter") {
			if(e.target.value.length > 0) {
				setTags([...tags, e.target.value]);
				e.target.value = "";
			}
		}
	};
	const removeTag = (removeTag) => {
		const newTags = tags.filter((tag) => tag !== removeTag);
		setTags(newTags);
	};
    return (
			<div className="tag-card">
				<div className="tag-container">
					{tags.map((tag, index) => {
						return (
							<div key={index} className="tag">
								{tag}
								<span
									role="button"
									tabIndex={0}
									onClick={() => removeTag(tag)}
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
						onKeyDown={addTag}
					/>
				</div>
			</div>
		);
};

export default Tags;