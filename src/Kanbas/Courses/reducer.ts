import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
      addEnrollment: (state, { payload: [courseId, userId] }) => {
        const newEnrollment: any = {
          _id: new Date().getTime().toString(),
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
      },
      deleteEnrollment: (state, { payload: [courseId, userId] }) => {
        state.enrollments = state.enrollments.filter(
          (m: any) => m.user !== userId || m.course !== courseId);
      },
    },
  });
  export const { addEnrollment, deleteEnrollment } =
    enrollmentsSlice.actions;
  export default enrollmentsSlice.reducer;