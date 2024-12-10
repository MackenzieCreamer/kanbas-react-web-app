import * as coursesClient from "../../client"
import * as quizzesClient from "../client"
import * as questionsClient from "../Questions/client"
import * as usersClient from "../../../Account/client"
import * as attemptsClient from "../Attempts/client"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setQuestions } from "../Questions/reducer";
import { setQuizzes } from "../reducer";
import { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { AnswersReview } from "./AnswersReview"
import { Link } from "react-router-dom"

export default function ReviewScreen() {
    const { cid,qid,attemptId } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [attempt,setAttempt] = useState<any>({_id:"",quiz:"",user:"",answers:Array(questions.length)})

    const parseDescription = (description:any) => {
        return draftToHtml(description);
    }
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
      const currentQuiz = quizzes.filter((quiz: any) => quiz._id === qid)[0] !== undefined ? 
      quizzes.filter((quiz: any) => quiz._id === qid)[0] : quiz
      setQuiz({...currentQuiz})
      const quizId = currentQuiz._id
      const questions = await quizzesClient.findQuestionsForQuiz(quizId as string);
      dispatch(setQuestions(questions));
      setAttemptFunction()
    };
    useEffect(() => {
      fetchQuizzes();
    }, []);
    const initialState = quizzes.filter((quiz: any) => quiz._id === qid)[0] !== undefined ? 
    quizzes.filter((quiz: any) => quiz._id === qid)[0] : {
      title: "New Title",
      points: 0,
      description: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      quizType:"GRADED",
      assignGroup:"QUIZZES",
      shuffle:true,
      timeLimit:0,
      multipleAttemptsAllowed:false,
      multipleAttempts:1,
      showCorrect:false,
      accessCode:"",
      singleQuestion:true,
      webcamRequired:false,
      questionLock:false,
      published:false,
      startshort: "2999-01-01",
      dueshort: "2999-12-31",
      untilshort: "2999-12-31",
      course: cid,
    };
    const [quiz, setQuiz] = useState<any>(initialState);

    const setAttemptFunction = async () =>{
        const attempt = await attemptsClient.findAttemptById(attemptId as string);
        setAttempt(attempt[0]);
    }

    return(
        <div>
            <h1>{quiz.title}</h1>
            <hr/>
            <div className="w-75 m-auto">
            {questions.map( (question:any) => {
            const questionNumber = questions.indexOf(question)
            return <div className="form-control p-0 border-secondary mb-3 rounded-0">
                <div className="bg-light d-flex border-bottom border-secondary p-1 justify-content-between align-items-center">
                    <h2 className="d-inline p-0 m-0"><b>{question.title}</b></h2>
                    <h3 className="d-inline p-0 m-0">{question.points} pts</h3>
                </div>
                <div className="p-2">
                    <div className="form-control bg-light mb-3 m-0 p-0 ps-3 pt-3">
                            {parse(parseDescription(question.description))}
                    </div>
                    <AnswersReview  
                        question={question} 
                        responseAnswer={attempt.answers[questionNumber]}
                        />
                    </div>
                </div>
            })}
            {(currentUser.role==="FACULTY" || currentUser.role==="ADMIN") && <Link className="btn btn-secondary ms-3 float-end" to={"/Kanbas/Courses/"+cid+"/Quizzes/"+qid+"/Edit"}>Edit This Quiz</Link>}
            <button className="btn btn-secondary float-end" onClick={() => window.location.href="#/Kanbas/Courses/"+cid+"/Quizzes/"}>Return To Quizzes</button>
            </div>
        </div>
    )
}