import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = ({ onChange,expectedContent,triedContent }) => {
		const [tried_content, setTried_content] = useState("");
		const [expected_content, setExpected_content] = useState("");
		const [expect_content, setExpectedContent] = useState(expectedContent);
		const [try_content, setTriedContent] = useState(triedContent);
		const updateContent = (value) => {
			setTried_content(value);
			setExpected_content(value);
			setExpectedContent(value);
			setTriedContent(value);
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
	) : expected_content ? (
		<ReactQuill
			theme="snow"
			value={expected_content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	) : expect_content ? (
		<ReactQuill
			theme="snow"
			value={expect_content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	) : (
		<ReactQuill
			className="mt-3"
			theme="snow"
			value={try_content}
			formats={codeFormats}
			modules={editorModule}
			onChange={updateContent}
		/>
	);
};

export default RichText;
