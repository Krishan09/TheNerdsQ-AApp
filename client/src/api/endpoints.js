export const endpoints = {
    GET_QUESTIONS: () => "/api/questions",//{id, title, content, created_at, username, count_answers}
    GET_QUESTION: (questionId)=>`/api/questions/${questionId}`,
    GET_ANSWERS: (questionId)=>`/api/answers/${questionId}`,
    POST_ANSWER: ()=>"/api/answer", // body:{question_id:1, answer_content:'asdadsadas'}
    POST_QUESTION: ()=>"/api/question", // body:{title:'dad', content:'adsda', category:['sad','sad']},
    PATCH_QUESTION: () => "/questions", // body:{id:"5", title:"title", content:"ahshjsj"}
    PATCH_ANSWER: () => "/answers", // body:{id:"5", title:"title", content:"ahshjsj"}
    DELETE_QUESTION: () => "/questions/:id",
    DELETE_ANSWER: () => "/answers/:id",
};

