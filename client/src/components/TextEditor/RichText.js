import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = ({ onChange, defaultContent = "" }) => {
	const [content, setContent] = useState(defaultContent);
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
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
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

	const editorModule = { toolbar };
	return(
		<ReactQuill
			theme="snow"
			row={3}
			column={5}
			value={content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	);
};

export default RichText;
