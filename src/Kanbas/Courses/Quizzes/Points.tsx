import { useParams } from "react-router";
import * as usersClient from "../../Account/client"
import { useSelector } from "react-redux";
import { useState } from "react";


export default function Points({quiz} : {quiz:any}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [score,setScore] = useState(0)
    const [attempted,setAttempted] = useState(false)
    const getScoreForUserForQuiz = async (quiz:any) => {
        const [attempt] = await usersClient.getAttemptForUser(currentUser._id,quiz._id)
        setRenders(renders+1)
        if(attempt !== undefined){
            setAttempted(true)
            setScore(attempt.points)
        }
    }
    const MAX_RERENDERS = 10
    const [renders, setRenders] = useState(0)
    if(renders<MAX_RERENDERS){
        getScoreForUserForQuiz(quiz)
    }
    return(<span>
        {attempted && `${score} out of`} 
        </span>)
}