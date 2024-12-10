import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as coursesClient from "../../client"
import * as quizzesClient from "../client"
import * as questionsClient from "../Questions/client"
import * as answersClient from "../Questions/Answers/client"
import * as usersClient from "../../../Account/client"
import * as attemptsClient from "../Attempts/client"
import { setQuestions } from "../Questions/reducer";
import { setQuizzes } from "../reducer";
import { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { Answers } from "./Answers";
import { Link } from "react-router-dom";



export default function AttemptScreen(){
    const { cid,qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);


    
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

    const parseDescription = (description:any) => {
        return draftToHtml(description);
    }
    const [quiz, setQuiz] = useState<any>(initialState);
    
    const [answers,setAnswers] = useState<any>(Array(questions.length))
    // console.log(answers)
    const setSpecificAnswer = async (questionNumber:number,answer:any) => {
        const answerList = answers;
        answerList[questionNumber] = answer;
        setAnswers(answerList)
    }

    const submitAttempt = async () => {
        const answerList = answers;
        let points = 0;
        for(const question of questions){
            const questionNumber = questions.indexOf(question)
            if(question.questionType == "BLANK"){
                if(answers[questionNumber] !== undefined){
                    let needNew = true;
                    for(const choice of question.correctChoices){
                        const value = await answersClient.findAnswerById(choice)
                        if(value[0].answerContent == answers[questionNumber]){
                            console.log("correct")
                            setSpecificAnswer(questionNumber,value[0])
                            needNew = false;
                            points += question.points;
                            break
                        }
                    }
                    if(needNew){
                        const answer = await questionsClient.createAnswerForQuestion(question._id,{answerContent:answers[questionNumber]})
                        console.log(answer)
                        answerList[questionNumber] = answer    
                    }
                }
            } else {
                if(answers[questionNumber]._id == question.correctChoices[0]){
                    points += question.points;
                }
            }
        }
        const attempt = await usersClient.getAttemptForUser(currentUser._id,quiz._id)
        if(attempt.length===0){
            const attempt = await usersClient.createAttemptForUser(currentUser._id,quiz._id,{answers:answerList,attemptNumber:1,points:points})
            return attempt._id;
        } else {
            const status = await attemptsClient.updateAttempt({...attempt[0],answers:answerList,attemptNumber:attempt[0].attemptNumber+1,points:points})
            return attempt[0]._id
        }

    }

    return (
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
                <div className="p-1">
                    <div className="form-control bg-light mb-3 m-0 p-0 ps-3 pt-3">
                            {parse(parseDescription(question.description))}
                    </div>
                    <Answers 
                        question={question} 
                        questionNumber={questionNumber}
                        setAnswer={setSpecificAnswer}
                        />
                    </div>
                </div>
            })}
            <div>
                <button className="btn btn-secondary float-end" onClick={async ()=>{const attemptId = await submitAttempt(); window.location.href="#/Kanbas/Courses/"+cid+"/Quizzes/"+qid+"/"+attemptId+"/review"}}>Submit Quiz</button>
                {(currentUser.role==="FACULTY" || currentUser.role==="ADMIN") && <Link className="btn btn-secondary me-3 float-end" to={"/Kanbas/Courses/"+cid+"/Quizzes/"+qid+"/Edit"}>Edit This Quiz</Link>}
            </div>
        </div>
        </div>
    );
}