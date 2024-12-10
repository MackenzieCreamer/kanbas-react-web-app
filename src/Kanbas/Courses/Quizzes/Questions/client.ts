import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/Questions`;

export const deleteQuestion = async (questionId: string) => {
 const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
 return response.data;
};

export const updateQuestion = async (question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return data;
};

export const findAnswersForQuestion = async (questionId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}/Answers`);
    return data;
};

export const createAnswerForQuestion = async (questionId: string, answer: any) => {
    
    const response = await axiosWithCredentials.post(
        `${QUESTIONS_API}/${questionId}/Answers`,
        answer
      );
      return response.data;
};