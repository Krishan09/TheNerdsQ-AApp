import React, { useState } from "react";
import ListedQtnThread from "../ListedQtnThread/ListedQthThread";
import AnswersByIdThreads from "../AnswersById/AnswersByIdThreads";

function QuestionAnswer() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);


  return (
    <div><div><ListedQtnThread onPressQuestion={(questionId)=>setSelectedQuestion(questionId)} /></div> <div>{selectedQuestion && <AnswersByIdThreads questionId={selectedQuestion} />}</div></div>
  );
}

export default QuestionAnswer;