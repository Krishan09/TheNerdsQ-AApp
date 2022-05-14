import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ReplyForm.css";
import DOMPurify from "dompurify";
import "./RichText.css";

const api = "/api";
const ReplyForm = ({ questionId }) => {
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	const [content, setContent] = useState('');

  const codeFormats=["code-block", "bold", "italic", "link", "underline"]
  const toolbar=[ 
	  ["bold","italic","underline" ],
	  ["link"],
	  ["code-block"],
  ]

  const editorModule={toolbar}
  

	const onSubmitReply = async (e) => {
		e.preventDefault();
		try {
			const body = {
				question_id: questionId,
				answer_content: DOMPurify.sanitize(content),
			};
			await fetch(`${api}/answer`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
		} catch (err) {
			console.error(err.message);
		}
		window.location = "/";
	};

	return (
		<div>
			<>
				<AnswersByIdThreads questionId={questionId} />
			</>
			<form
				action=""
				className="replyFormStyle form-group"
				onSubmit={onSubmitReply}
			>
				<div className="App">
					<header className="App-header">Your answer</header>
					<ReactQuill theme="snow" value={content} formats={codeFormats} modules={editorModule} onChange={setContent}/>

				</div>
				<button className="btn reply-btn">Reply</button>
			</form>
		</div>
	);
};

export default ReplyForm;