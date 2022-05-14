import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";
//import { convertFromRaw, convertToRaw } from "draft-js";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




import "./ReplyForm.css";
//import RichText from "../TextEditor/RichText";
// import { EditorState } from "draft-js";
// import { convertToHTML } from "draft-convert";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import DOMPurify from "dompurify";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import { convertToHTML } from "draft-convert";
//import parse from "html-react-parser";
import DOMPurify from "dompurify";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";

const api = "/api";
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
	// const [editorState, setEditorState] = useState(() =>
	// 	EditorState.createEmpty()
	// );
	// const [convertedContent, setConvertedContent] = useState(null);
	// const handleEditorChange = (state) => {
	// 	setEditorState(state);
	// 	convertContentToHTML();
	// };
	// const convertContentToHTML = () => { 
	// 	console.log(editorState.getCurrentContent());
	// 	let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
	// 	setConvertedContent(currentContentAsHTML);
	// };
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
					<ReactQuill theme="snow" value={content} formats={codeFormats} modules={editorModule} onChange={setContent}/>


				</div>
				<button className="btn reply-btn">Reply</button>
			</form>
		</div>
	);
};

export default ReplyForm;