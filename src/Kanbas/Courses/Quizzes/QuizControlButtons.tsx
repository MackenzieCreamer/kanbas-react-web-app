import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import GreenCheckmark from "./GreenCheckmark";
import QuizDeleter from "./QuizRemovalPrompt";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function QuizControlButtons({quiz,published,publishQuiz,quizId,setQuizId,deleteQuiz,quizTitle, titleState, setQuizTitle}:
          {quiz:any[],published:boolean,publishQuiz:(quiz:any[],published:boolean) => void;quizId:string;setQuizId: (_id: string) => void;deleteQuiz:(quizId: string) => void;quizTitle:string;titleState:string,setQuizTitle:(title:string)=>void;}) {
  return (
    <div className="float-end d-flex align-items-center">
      
      <div onClick={() => publishQuiz(quiz,published)}>{published && <GreenCheckmark />}{!published && <AiOutlineStop />}</div>
      <div className="dropdown d-inline me-1 float-end">
          <button id="wd-quiz-options-dropdown" className="btn btn-lg btn-white"
            type="button" data-bs-toggle="dropdown">
            <IoEllipsisVertical className="fs-4" />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a id="wd-quiz-btn" onClick={() => publishQuiz(quiz,published)} className="dropdown-item">
                {!published && "Publish Quiz"}{published && "Unpublish Quiz"}</a>
            </li>
            <li>
              <Link id="wd-publish-modules-only-button" className="dropdown-item" to={quizId+"/edit"}>Edit Quiz</Link>
            </li>
            <li>
              <a data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog" 
                id="wd-delete-quiz-btn" className="dropdown-item" onClick={() => {setQuizId(quizId);setQuizTitle(quizTitle);}}>
                Delete Quiz</a>
            </li>
          </ul>
        </div>
      <QuizDeleter dialogTitle="Delete Quiz" dialogDescription={"Are you sure you want to delete \"" + titleState + "\"?"}
                    quizId={quizId} deleteQuiz={deleteQuiz} setQuizId={setQuizId}/>
    </div>
);}
