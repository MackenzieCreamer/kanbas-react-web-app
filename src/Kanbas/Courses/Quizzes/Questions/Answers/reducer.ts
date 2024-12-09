import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    answers: [],
};
const answersSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
      setAnswers: (state, action) => {
        state.answers = action.payload;
      },  
      addAnswer: (state, { payload: question }) => {
        const newAnswer: any = {
          _id: new Date().getTime().toString(),
          text: question.title,
          description: question.description,
          questionType: question.type,
          points: question.points,
          answers: question.answers,
          correctAnswers: question.correctAnswers,
        };
        state.answers = [...state.answers, newAnswer] as any;
      },
      deleteAnswer: (state, { payload: answerId }) => {
        state.answers = state.answers.filter(
          (m: any) => m._id !== answerId);
      },
      updateAnswer: (state, { payload: answer }) => {
        state.answers = state.answers.map((m: any) =>
          m._id === answer._id ? answer : m
        ) as any;
      },
    },
  });
  export const { addAnswer, deleteAnswer, updateAnswer, setAnswers } =
    answersSlice.actions;
  export default answersSlice.reducer;