import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: assignments,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
      addAssignment: (state, { payload: assignment }) => {
        const newAssignment: any = {
          _id: new Date().getTime().toString(),
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          startshort: assignment.startshort,
          dueshort: assignment.dueshort,
          untilshort: assignment.untilshort,
          course: assignment.course,
        };
        state.assignments = [...state.assignments, newAssignment] as any;
      },
      deleteAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter(
          (m: any) => m._id !== assignmentId);
      },
      updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((m: any) =>
          m._id === assignment._id ? assignment : m
        ) as any;
      },
    },
  });
  export const { addAssignment, deleteAssignment, updateAssignment } =
    assignmentsSlice.actions;
  export default assignmentsSlice.reducer;