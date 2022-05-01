import React, { useState }from "react";
import ReplyForm from "../../components/ReplyForm/ReplyForm";
import QuestionById from "../../components/QuestionById/QuestionById";
//import { questionsData } from "../../mock/data";

import "./SelectedQtnThread.css";


const SelectedQtnThread = ({ id }) => {
	// const answers = questionsData.map((el) => el.answers);
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
				<QuestionById questionId={id} />
			</li>
			<li>
				<ReplyForm questionId={id} />
			</li>
		</ul>
	);
};

export default SelectedQtnThread;