import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
      setQuestions: (state, action) => {
        state.questions = action.payload;
      },  
      addQuestion: (state, { payload: question }) => {
        const newQuestion: any = {
          _id: new Date().getTime().toString(),
          title: question.title,
          description: question.description,
          questionType: question.type,
          points: question.points,
          answers: question.answers,
          correctAnswers: question.correctAnswers,
        };
        state.questions = [...state.questions, newQuestion] as any;
      },
      deleteQuestion: (state, { payload: questionId }) => {
        state.questions = state.questions.filter(
          (m: any) => m._id !== questionId);
      },
      updateQuestion: (state, { payload: question }) => {
        state.questions = state.questions.map((m: any) =>
          m._id === question._id ? question : m
        ) as any;
      },
    },
  });
  export const { addQuestion, deleteQuestion, updateQuestion, setQuestions } =
    questionsSlice.actions;
  export default questionsSlice.reducer;