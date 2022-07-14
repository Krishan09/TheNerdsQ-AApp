import React from "react";
import ListedQtnThread from "../components/ListedQtnThread/ListedQtnThread";
import "./Home.css";

const Main = () => {
  return (
		<main className="main" role="main">
			<div className="top text-center">
				<h1 className="text-wrap">TheNerds Q & A APP</h1>
				<p className="top-p text-wrap fs-6">Ask a code-related question</p>
			</div>
			<div className="questionsDiv">
				<ListedQtnThread />
			</div>
		</main>
	);

};
export default Main;