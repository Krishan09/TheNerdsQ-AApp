import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ReplyForm.css";

const ReplyForm = ({ questionId,content,setContent,onSubmitReply,answers,getAnswers }) => {
	

  const codeFormats = [
		"code-block",
		"bold",
		"italic",
		"link",
		"underline",
		"image",
		"header",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
	];
  const toolbar = [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["code-block"],
		["clean"],
	];

  const editorModule={ toolbar };
	return (
		<div>
			<>
				<AnswersByIdThreads questionId={questionId} answers={answers} getAnswers={getAnswers}/>
			</>
			<form
				action=""
				className="replyFormStyle form-group"
				onSubmit={onSubmitReply}
			>
				<div className="App">
					<header className="App-header">Your answer</header>
					<ReactQuill theme="snow" value={content} formats={codeFormats} modules={editorModule} onChange={ setContent } />

				</div>
				<button className="btn reply-btn">Reply</button>
			</form>
		</div>
	);
};

export default ReplyForm;