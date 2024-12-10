import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as usersClient from "../../Account/client"

export default function ButtonsForDetailsPage({quiz} : {quiz:any}){
    const {cid,qid} = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [attempts,setAttempts] = useState(0)
    const [attempted,setAttempted] = useState(false)
    const [attemptId,setAttemptId] = useState("")
    const getAttemptsForUserForQuiz = async (quiz:any) => {
        if(quiz._id !== undefined){
            const [attempt] = await usersClient.getAttemptForUser(currentUser._id,quiz._id)
            setRenders(renders+1)
            if(attempt !== undefined){
                setAttempted(true)
                setAttemptId(attempt._id)
                setAttempts(attempt.attemptNumber)
            }    
        }
    }
    const MAX_RERENDERS = 10
    const [renders, setRenders] = useState(0)
    if(renders<MAX_RERENDERS){
        getAttemptsForUserForQuiz(quiz)
    }

    return (
        <div className="d-flex justify-content-center">
            {attempted && <Link className="btn btn-lg btn-secondary m-2" to={"/Kanbas/Courses/"+cid+"/Quizzes/"+quiz._id+"/"+ attemptId + "/review"}>View Last Attempt</Link>}
            <Link className={`btn btn-lg btn-danger m-2 ${attempts >= quiz.multipleAttempts ? "disabled":""}`} to={"../Quizzes/"+ quiz._id+"/preview"}>{attempts>=quiz.multipleAttempts && "No More Attempts"}{!(attempts>=quiz.multipleAttempts) && "New Attempt"}</Link>
        </div>
    )
}