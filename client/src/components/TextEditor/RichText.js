import React, { useState } from "react";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThread";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
const RichText = ({onChange}) => {
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};
	clear
		const [content, setContent] = useState("");
		const updateContent = (value) => {
			setContent(value);
			onChange(value);
		};

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
		["clean"],
	];

  const editorModule={ toolbar };
	return (
		<ReactQuill
			theme="snow"
			value={content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	);
};

export default RichText;
