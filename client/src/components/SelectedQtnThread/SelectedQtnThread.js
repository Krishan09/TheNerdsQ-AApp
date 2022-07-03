import React, { useState, useEffect } from "react";
import ReplyForm from "../../components/ReplyForm/ReplyForm";
import QuestionById from "../../components/QuestionById/QuestionById";
import "./SelectedQtnThread.css";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

const api = "/api";

const SelectedQtnThread = ({ id, editMode }) => {
	const [question, setQuestion] = useState(null);
	const [answers, setAnswers] = useState([]);
	const { userId, userName } = useSelector((state) => state);
	const [editQuestionValues, setEditQuestionValues] = useState({
		title: "",
		triedContent: "",
		expectedContent: "",
	});
	const toggleMode = (data) => {
		setQuestion(data);
		if (data) {
			setEditQuestionValues({
				title: data[0].title,
				triedContent: data[0].tried_content,
				expectedContent: data[0].expected_content,
			});
		}
	};

	const getQuestions = () => {
		console.log("here")
		fetch(`${api}/questions/${id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => toggleMode(data));
	};
	const getAnswers=() => {
		fetch(`${api}/answers/${id}`)
			.then((res) => res.json())
			.then((data) => setAnswers(data))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getQuestions();
		getAnswers();
	}, [id]);

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
		}).then(getQuestions);
	};

	// Start of reply form methods
	const [content, setContent] = useState("");
	const onSubmitReply = async (e) => {
		e.preventDefault();
		try {
			const body = {
				question_id: id,
				answer_content: DOMPurify.sanitize(content),
				responder: userName? userName: "Guest",
			};
			if(userId) {
				body.userId = userId;
			}
			const result = await fetch(`${api}/answer`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			if(result.ok) {
				getAnswers();
				setContent("");
			}else{
				alert("Error: something went wrong, please try again later." );
			}
		} catch (err) {
			alert("Error: something went wrong, please try again later.");
		}
	};
	// end of reply form methods
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
				<QuestionById
					key={id}
					questionId={id}
					editMode={editMode}
					question={question}
					saveQuestion={saveQuestion}
					onSetEditQuestionValues={onSetEditQuestionValues}
					editQuestionValues={editQuestionValues}
				/>
			</li>
			<li>
				<ReplyForm
					questionId={id}
					content={content}
					setContent={setContent}
					onSubmitReply={onSubmitReply}
					answers={answers}
					getAnswers={getAnswers}
				/>
			</li>
		</ul>
	);
};

export default SelectedQtnThread;
