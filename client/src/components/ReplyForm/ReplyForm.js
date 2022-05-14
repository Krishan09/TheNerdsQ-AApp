import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";

import "./ReplyForm.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";

const api = "/api";
const ReplyForm = ({ questionId }) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const [convertedContent, setConvertedContent] = useState(null);
	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};
	const convertContentToHTML = () => {
		let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
		setConvertedContent(currentContentAsHTML);
	};
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	const onSubmitReply = async (e) => {
		e.preventDefault();
		try {
			const body = {
				question_id: questionId,
				answer_content: convertedContent,
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
					<Editor
						editorState={editorState}
						onEditorStateChange={handleEditorChange}
						wrapperClassName="wrapper-class"
						editorClassName="editor-class"
						toolbarClassName="toolbar-class"
					/>
				</div>
				<button className="btn reply-btn">Reply</button>
			</form>
		</div>
	);
};

export default ReplyForm;