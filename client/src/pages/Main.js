import React from "react";
import Navigation from "./Navigation";
import SelectedQtnThread from "../components/SelectedQtnThread/SelectedQtnThread";
import ListedQtnThread from "../components/ListedQtnThread/ListedQtnThread";
import "./Home.css";
import Footer from "./Footer";
import { useState } from "react";
import AskQuestionForm from "../components/AskQuestionForm/AskQuestionForm";


const Main = () => {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);


  const handleShow = () => {
    setShow(!show);
  };

  return show === true ? (
		<>
			<AskQuestionForm show={show} />
		</>
	) : (
		<div className="main-container">
			<Navigation />
			<button className="ask-btn btn" onClick={handleShow}>
				Ask Question
			</button>
			<main className="main" role="main">
				<div className="top">
					<h1>TheNerds Q & A APP</h1>
					<p className="top-p">Ask a code-related question</p>
				</div>
				<div className="questionsDiv">
					{typeof id === "number" && <SelectedQtnThread id={id} />}
					<ListedQtnThread
						onPressQuestion={(questionId) => setId(questionId)}
						questionId={id}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
};
export default Main;