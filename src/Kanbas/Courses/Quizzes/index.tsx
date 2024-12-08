import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsGripVertical } from "react-icons/bs";
import GroupControlButtons from "./GroupControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client"

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quizId, setQuizId] = useState("");
    const [quizTitle, setQuizTitle] = useState("");
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
      fetchQuizzes();
    }, []);
    const removeQuiz = async (quizId: string) => {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    };
    const publishQuiz = async (quiz:any[], published:boolean) => {
      console.log(published)
      await quizzesClient.updateQuiz({...quiz,published:!published})
      dispatch(updateQuiz(quiz));
      fetchQuizzes();
    }
  
    const saveQuiz = async (quiz: any) => {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
      fetchQuizzes();
    };

    const today = new Date();
  

    return (
      <div id="wd-quiz">
        {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && (<div>
        <div className="display-flex align-items-center align-content-center" style={{height:"120px"}}>
          <Link id="wd-add-quiz" className="btn btn-lg btn-danger m-2 float-end"
            type="button" to={new Date().getTime().toString() + "/edit"}>
            + Quiz
          </Link>
          <button id="wd-add-group" className="btn btn-lg btn-secondary m-2 float-end"
            type="button">
            + Group
          </button>

          <div className="d-flex flex-fill position-relative m-2" style={{height:"48px"}}>
            <label htmlFor="wd-search-quiz"><FaMagnifyingGlass className="position-absolute top-50 translate-middle ms-4 text-secondary"/></label>
            <input className="form-control ps-5" id="wd-search-quiz"
              placeholder="Search..." />
          </div>
        </div>
        </div>)}
        {(currentUser.role !=="FACULTY" && currentUser.role !=="ADMIN") && (<div>
          <div className="d-flex flex-fill position-relative m-2" style={{height:"48px"}}>
            <label htmlFor="wd-search-quiz"><FaMagnifyingGlass className="position-absolute top-50 translate-middle ms-4 text-secondary"/></label>
            <input className="form-control ps-5" id="wd-search-quiz"
              placeholder="Search..." />
          </div>
        </div>)}
        <ul id="wd-quiz-list" className="list-group rounded-0">
          <li className="wd-quiz-list-item list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-group-title d-flex p-3 ps-2 bg-secondary">
              {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && <BsGripVertical className="me-2 fs-3" />}
              <FaCaretDown className="me-1 fs-3"/>
              <div>QUIZZES</div>
              <div className="ms-auto bg-light ps-2 pe-2 me-1 rounded-pill">20% of Total</div>
              <GroupControlButtons />
            </div>
            <ul className="wd-quiz list-group rounded-0 border-start border-success border-5">
              {quizzes
                .map((quiz: any) => (
                  <li className="wd-quiz list-group-item p-3 ps-1 d-flex align-items-center">
                  {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && <BsGripVertical className="me-2 fs-3" />}
                  <LiaClipboardListSolid className="me-2 fs-3 text-success"/>
                  <div className="d-flex flex-column align-content-center w-75">
                    <a className="wd-quiz-link text-decoration-none text-dark fw-bold"
                      href={"#/Kanbas/Courses/"+cid+"/Quizzes/"+quiz._id+"/details"}>
                      {quiz.title}
                    </a>
                    <div className="fs-6">
                    <div className="d-inline text-danger">Multiple Modules</div> | {today > (new Date(quiz.untilshort)) && <b>Closed</b>}{today > (new Date(quiz.startshort)) && today < (new Date(quiz.untilshort)) && <b>Available</b>} {today < (new Date(quiz.startshort)) && <b>Not available until</b>} {today < (new Date(quiz.startshort)) && (new Date((quiz.startshort.substring(0,10)).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} {today < (new Date(quiz.startshort)) && <span>at 12:00 AM</span>} | <b>Due</b> {(new Date(quiz.dueshort.substring(0,10).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 11:59 pm | {quiz.points} pts
                    </div>
                  </div>
                  {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && <div className="ms-auto">
                    <QuizControlButtons
                     quiz={quiz}
                     published={quiz.published}
                     publishQuiz={publishQuiz}
                     setQuizId={setQuizId}
                     quizId={quiz._id}
                     deleteQuiz={() => {
                      removeQuiz(quizId)
                    }}  setQuizTitle={setQuizTitle}
                    quizTitle={quiz.title}
                    titleState = {quizTitle}
                    /> 
                  </div>}
                </li>
                ))
              }
            </ul>
          </li>
        </ul>
      </div>
  );}
  