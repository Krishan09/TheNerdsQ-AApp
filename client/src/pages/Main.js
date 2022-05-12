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
		<div className="containermain">
			<Navigation />
			<main className="main" role="main">
				<button className="ask-btn btn" onClick={handleShow}>
					Ask Question
				</button>
				<div className="top">
					<h1>TheNerds Q & A APP</h1>
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