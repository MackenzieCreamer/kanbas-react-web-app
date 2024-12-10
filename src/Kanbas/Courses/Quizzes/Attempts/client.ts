import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/Attempts`;
export const updateAttempt = async (attempt: any) => {
    const response = await axiosWithCredentials.put(`${ATTEMPTS_API}/${attempt._id}`, attempt);
    return response.data;
};

export const findAttemptById = async (attemptId: string) => {
    const response = await axiosWithCredentials.get(`${ATTEMPTS_API}/${attemptId}`);
    return response.data;
};