import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = ({ onChange }) => {
		const [tried_content, setTried_content] = useState("");
		const [expected_content, setExpected_content] = useState("");
		const updateContent = (value) => {
			setTried_content(value);
			setExpected_content(value);
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

  const editorModule={ toolbar };
	return tried_content ? (
		<ReactQuill
			theme="snow"
			row={3}
			column={5}
			value={tried_content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	) : (
		<ReactQuill
			theme="snow"
			value={expected_content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	);
};

export default RichText;
