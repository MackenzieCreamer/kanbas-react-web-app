import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANSWERS_API = `${REMOTE_SERVER}/api/Answers`;
export const deleteAnswer = async (answerId: string) => {
 const response = await axiosWithCredentials.delete(`${ANSWERS_API}/${answerId}`);
 return response.data;
};
export const updateAnswer = async (answer: any) => {
    const { data } = await axiosWithCredentials.put(`${ANSWERS_API}/${answer._id}`, answer);
    return data;
};
export const findAnswerById = async (answerId: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${answerId}`);
    return data;
};