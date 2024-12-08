import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
      setQuizzes: (state, action) => {
        state.quizzes = action.payload;
      },  
      addQuiz: (state, { payload: quiz }) => {
        const newQuiz: any = {
          _id: new Date().getTime().toString(),
          title: quiz.title,
          description: quiz.description,
          quizType: quiz.type,
          points: quiz.points,
          assignGroup: quiz.assignGroup,
          shuffle: quiz.shuffle,
          timeLimit: quiz.timeLimit,
          multipleAttempts: quiz.multipleAttempts,
          showCorrect: quiz.showCorrect,
          accessCode: quiz.accessCode,
          singleQuestion: quiz.singleQuestion,
          webcamRequired: quiz.webcamRequired,
          questionLock: quiz.questionLock,
          startshort: quiz.startshort,
          dueshort: quiz.dueshort,
          untilshort: quiz.untilshort,
          course: quiz.course,
        };
        state.quizzes = [...state.quizzes, newQuiz] as any;
      },
      deleteQuiz: (state, { payload: quizId }) => {
        state.quizzes = state.quizzes.filter(
          (m: any) => m._id !== quizId);
      },
      updateQuiz: (state, { payload: quiz }) => {
        state.quizzes = state.quizzes.map((m: any) =>
          m._id === quiz._id ? quiz : m
        ) as any;
      },
    },
  });
  export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
    quizzesSlice.actions;
  export default quizzesSlice.reducer;