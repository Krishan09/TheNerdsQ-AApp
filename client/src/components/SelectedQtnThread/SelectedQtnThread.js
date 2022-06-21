import React, { useState }from "react";
import ReplyForm from "../../components/ReplyForm/ReplyForm";
import QuestionById from "../../components/QuestionById/QuestionById";
import "./SelectedQtnThread.css";


const SelectedQtnThread = ({ id,editMode }) => {
	const [hide, setHide] = useState(false);

	const handleHide = (e) => {
		e.preventDefault();
		setHide(!hide);
		window.location.reload(true);
	};
	return (
		<ul className={hide ? "hide" : "selectedQtnContain"}>
			<li>
				<button
					type="button"
					className="close"
					aria-label="Close"
					onClick={handleHide}
				>
					<span aria-hidden="true">&times;</span>
				</button>
				<QuestionById key={id} questionId={id} editMode={editMode} />
			</li>
			<li>
				<ReplyForm questionId={id} />
			</li>
		</ul>
	);
};

export default SelectedQtnThread;