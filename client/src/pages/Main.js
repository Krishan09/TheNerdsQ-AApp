import React from "react";
import SelectedQtnThread from "../components/SelectedQtnThread/SelectedQtnThread";
import ListedQtnThread from "../components/ListedQtnThread/ListedQtnThread";
import "./Home.css";
import { useState } from "react";
import { useSelector } from "react-redux";



const Main = () => {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const { email } = useSelector((state) => state);
  const [edit, setEdit] = useState(false);

  const openQuestion = (questionId, editMode) => {
	setId (questionId);
	setEdit(editMode);
  };

  const handleShow = () => {
		setShow(!show);
  };
  return (
		
			<main className="main" role="main">
				<div className="top text-center">
					<h1 className="text-wrap">TheNerds Q & A APP</h1>
					<p className="top-p text-wrap fs-6">Ask a code-related question</p>
				</div>
				<div className="questionsDiv">
					{typeof id === "number" && (
						<SelectedQtnThread editMode={edit} id={id} />
					)}
					<ListedQtnThread onPressQuestion={openQuestion} questionId={id} />
				</div>
			</main>
			
	);
//   return show === true ? (
// 		!email ? (
// 			<>
// 				<Notloggedin setShow={setShow}></Notloggedin>
// 			</>
// 		) : (
// 			<>
// 				<AskQuestionForm show={show} setShow={setShow} />
// 			</>
// 		)
// 	) : (
// 		<div className="main-container">
// 			<Navigation handleShow={handleShow} />
// 			<main className="main" role="main">
// 				<div className="top text-center">
// 					<h1 className="text-wrap">TheNerds Q & A APP</h1>
// 					<p className="top-p text-wrap fs-6">Ask a code-related question</p>
// 				</div>
// 				<div className="questionsDiv">
// 					{typeof id === "number" && (
// 						<SelectedQtnThread editMode={edit} id={id} />
// 					)}
// 					<ListedQtnThread onPressQuestion={openQuestion} questionId={id} />
// 				</div>
// 			</main>
// 			<Footer />
// 		</div>
// 	);
};
export default Main;