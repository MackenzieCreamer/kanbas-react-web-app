import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/Assignments`;
export const deleteAssignment = async (assignmentId: string) => {
 const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
 return response.data;
};
export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axios.post(
    `${ASSIGNMENTS_API}/${courseId}/Assignments`,
    assignment
    );
    return response.data;
};
  