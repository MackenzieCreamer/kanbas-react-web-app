import { useParams } from "react-router";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuizzes, updateQuiz } from "./reducer";
import react, { useEffect, useState, Component } from "react";
import * as quizzesClient from "./client"
import * as coursesClient from "../client"
import { Link } from "react-router-dom";

export default function QuizDetails() {
  const { cid,qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const initialState = quizzes.filter((quiz: any) => quiz._id === qid)[0] !== undefined ? 
  quizzes.filter((quiz: any) => quiz._id === qid)[0] : {
    title: "New Title",
    points: 0,
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

  const dispatch = useDispatch();
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
    const currentQuiz = quizzes.filter((quiz: any) => quiz._id === qid)[0] !== undefined ? 
    quizzes.filter((quiz: any) => quiz._id === qid)[0] : quiz
    setQuiz({...currentQuiz})
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  

  return (
    <div id="wd-quiz-details" className="d-flex flex-column">
        {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && <div className="d-flex justify-content-center">
          <Link id="wd-add-quiz" className="btn btn-lg btn-secondary m-2 d-flex align-items-center"
            type="button" to={"../Quizzes/"+ qid+"/edit"}>
            <FaPencilAlt className="me-2"/>
            Edit
          </Link>
          <Link id="wd-add-quiz" className="btn btn-lg btn-secondary m-2"
            type="button" to={"../Quizzes/"+ qid+"/preview"}>
            Preview
          </Link>
        </div>}
        <hr/>
        <h1>{quiz.title}</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Quiz Type</b></div>
            <div id="wd-quiz-type" style={{width:"200px"}}>
              {quiz.quizType}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Points</b></div>
            <div id="wd-quiz-points" style={{width:"200px"}}>
              {quiz.points}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Points</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.assignGroup}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Shuffle Answers</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.shuffle && "Yes"}
              {!quiz.shuffle && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Time Limit</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.timeLimit > 0 && quiz.timeLimit} {quiz.timeLimit > 0 && " Minutes"}
              {quiz.timeLimit == 0 && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Multiple Attempts</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.multipleAttemptsAllowed && "Yes, "}{quiz.multipleAttemptsAllowed && quiz.multipleAttempts}
              {!quiz.multipleAttemptsAllowed && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Show Correct Answers</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.showCorrect && "Yes"}
              {!quiz.showCorrect && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>One Question at a Time</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.singleQuestion && "Yes"}
              {!quiz.singleQuestion && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Webcam Requried</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.webcamRequired && "Yes"}
              {!quiz.webcamRequired && "No"}
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="align-content-center text-end pe-3" style={{width:"200px"}}><b>Lock Questions After Answering</b></div>
            <div id="wd-quiz-group" style={{width:"200px"}}>
              {quiz.questionLock && "Yes"}
              {!quiz.questionLock && "No"}
            </div>
          </div>
      </div>
    <div className="d-flex flex-column">
        <div className="d-flex">
            <div className="me-3" style={{ width: '25%'}}>
                <b>Due</b>
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                <b>For</b>
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                <b>Available From</b>
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                <b>Until</b>
            </div>
        </div>
        <div className="d-flex border-bottom border-top border-info">
            <div className="me-3" style={{ width: '25%'}}>
                {(new Date(quiz.dueshort.substring(0,10).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 11:59 pm
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                Everyone
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                {(new Date((quiz.startshort.substring(0,10)).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 12:00 AM
            </div>
            <div className="me-3" style={{ width: '25%'}}>
                {(new Date((quiz.untilshort.substring(0,10)).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 12:00 AM
            </div>
        </div>
    </div>
  </div>
)
;}
  