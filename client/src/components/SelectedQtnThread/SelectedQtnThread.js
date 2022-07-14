import React, { useState, useEffect } from "react";
import ReplyForm from "../../components/ReplyForm/ReplyForm";
import QuestionById from "../../components/QuestionById/QuestionById";
import "./SelectedQtnThread.css";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const api = "/api";

const SelectedQtnThread = () => {
	const { id } = useParams();
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);
	const { userId, userName } = useSelector((state) => state);

	const toggleMode = (data) => {
		setQuestion(data);
	};

	const getQuestions = () => {
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
	return (
		<ul className="selectedQtnContain">
			<li>
				<QuestionById key={id} questionId={id} question={question} />
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
