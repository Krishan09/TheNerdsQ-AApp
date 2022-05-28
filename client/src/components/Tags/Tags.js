import React from "react";
import "./Tag.css";

const Tags = ({ addCategory, removeCategory, category }) => {
    return (
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
		);
};

export default Tags;