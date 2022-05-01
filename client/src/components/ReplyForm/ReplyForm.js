import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";
//import { convertFromRaw, convertToRaw } from "draft-js";

import "./ReplyForm.css";
//import RichText from "../TextEditor/RichText";
// import { EditorState } from "draft-js";
// import { convertToHTML } from "draft-convert";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import DOMPurify from "dompurify";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
//import parse from "html-react-parser";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";

const api = process.env.API_URL || "/api";
const ReplyForm = ({ questionId }) => {
	// const [editorState, setEditorState] = useState(() =>
	// 	EditorState.createEmpty()
	// );
	// const [convertedContent, setConvertedContent] = useState(null);
	// const handleEditorChange = (state) => {
	// 	setEditorState(state);
	// 	convertContentToHTML();
	// };
	// const convertContentToHTML = () => {
	// 	let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
	// 	setConvertedContent(currentContentAsHTML);
	// };
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
					//"Content-Type": "application/x-www-form-urlencoded",
				},
				body: JSON.stringify(body),
			});
		} catch (err) {
			console.error(err.message);
		}
	};
	//const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );
	//https://draftjs.org/docs/api-reference-data-conversion/
	// const createMarkup = (html) => {
	// 	return {
	// 		__html: DOMPurify.sanitize(html),
	// 	};
	// };

	// const handleReply = (e) => {
	// 	e.preventDefault();
	// 	setUpdatedAnswersData((updatedAnswersData) => [
	// 		...updatedAnswersData,
	// 		{
	// 			description: convertedContent,
	// 			owner: name,
	// 		},
	// 	]);
	// 	e.target.children[0].value = "";
	// 	setEditorState("");
	// };
	// const createMarkup = (html) => {
	// 	return {
	// 		__html: DOMPurify.sanitize(html),
	// 	};
	// };

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
				{/* <Editor
					wrapperClassName="wrapper"
					editorClassName="editor"
					toolbarClassName="toolbar"
					editorState={editorState}
					onEditorStateChange={handleEditorChange}
					EditorState
					toolbar={{
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true },
						history: { inDropdown: true },
						link: {
							visible: true,
							inDropdown: true,
							addLink: { visible: true },
							removeLink: { visible: true },
						},
						image: {
							visible: true,
							fileUpload: true,
							url: true,
						},
					}}
				/> */}
				<div className="App">
					<header className="App-header">Your answer</header>
					<Editor
						editorState={editorState}
						onEditorStateChange={handleEditorChange}
						wrapperClassName="wrapper-class"
						editorClassName="editor-class"
						toolbarClassName="toolbar-class"
					/>
					<div
						className="preview"
						dangerouslySetInnerHTML={createMarkup(convertedContent)}
					></div>
				</div>
				<button className="btn reply-btn">Reply</button>
			</form>
		</div>
	);
};

export default ReplyForm;