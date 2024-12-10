import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuizzes, updateQuiz } from "./reducer";
import { addQuestion, setQuestions, updateQuestion, deleteQuestion } from "./Questions/reducer";
import react, { useEffect, useState, Component } from "react";
import * as quizzesClient from "./client"
import * as coursesClient from "../client"
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as questionsClient from "./Questions/client"
import draftToHtml from 'draftjs-to-html';
import QuestionEditor from "./Questions/Editor";
import QuestionPreview from "./Questions/Preview";

export default function QuizEditor() {
  const { cid,qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const [editingQuestion, setEditingQuestion] = useState<any>("");
  
  
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


  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

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
  const [detailMode,setDetailMode] = useState(true);

  const newFlag = quizzes.filter((quiz: any) => quiz._id === qid)[0] === undefined;

  const saveQuizButton = async (location:boolean) => {
    await saveQuiz({ ...quiz})
    if(location){
      window.location.href=("#/Kanbas/Courses/"+ cid +"/Quizzes");
      window.location.href=("#/Kanbas/Courses/"+ cid +"/Quizzes/"+qid+"/Details")  
    }
  }
  

  let content = {blocks:[],entityMap:{}};
  if(quiz.description.entityMap)
    content = quiz.description;
  else
    content = {...quiz.description, entityMap:{}}
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));

  const onEditorStateChange = function (editorState : any) {
    setQuiz({ ...quiz, description: convertToRaw(editorState.getCurrentContent())})
    setEditorState(editorState);
  };

  const createQuestionForQuiz = async () => {
    if (!qid) return;
    const newQuestion = { title: "New Question", description: convertToRaw(EditorState.createEmpty().getCurrentContent()), questionType: "MC", firstSave: true, quiz: qid };
    const question = await quizzesClient.createQuestionForQuiz(qid, newQuestion);
    const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };


  const removeQuestion = async (questionId: string) => {
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
    setQuiz({...quiz, points: await quizzesClient.findPointsForQuiz(quiz._id)})
    saveQuizButton(false)
  };

  const saveQuestion = async (question: any) => {
    console.log(question)
    await questionsClient.updateQuestion(question);
    dispatch(updateQuestion(question));
    setQuiz({...quiz, points: await quizzesClient.findPointsForQuiz(quiz._id)})
    saveQuizButton(false)
    const questions = await quizzesClient.findQuestionsForQuiz(quiz._id as string);
    dispatch(setQuestions(questions));
  };


  return (
    <div id="wd-quizzes-editor" className="d-flex flex-column">
        <div className="d-flex w-100 border-bottom border-secondary align-items-center justify-content-center pb-1 mb-1">
          <button onClick={() => setDetailMode(true)} className={`btn btn-secondary me-3 ${detailMode ? 'disabled':''}`}>Details</button>
          <button onClick={() => setDetailMode(false)} className={`btn btn-secondary ${detailMode ? '':'disabled'}`}>Questions</button>
          <div className="d-flex w-25 justify-content-end align-items-center">
            <label htmlFor="wd-points-count" className="ms-3 me-3">Points: </label>
            <input disabled value={quiz.points} className=" w-25 form-control"/>
          </div>
        </div>
        <div>
          {detailMode && <div>
            <label htmlFor="wd-name">Quiz Name</label>
            <input id="wd-name" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} className="form-control mb-3"/>
            Description
            <div className="mb-5 me-4">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="form-control"
                editorClassName="form-control"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className="d-flex mb-3">
              <label htmlFor="wd-points" className="align-content-center text-end pe-3" style={{width:"200px"}}>Points</label>
              <input id="wd-points" value={quiz.points} className="form-control" disabled />
            </div>
            <div className="d-flex mb-3">
              <label htmlFor="wd-quiz-type" className="align-content-center text-end pe-3" style={{width:"200px"}}>Quiz Type</label>
              <select defaultValue={quiz.quizType} id="wd-quiz-type" className="form-control" onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                <option value="GRADED">GRADED QUIZ</option>
                <option value="PRATICE">PRACTICE QUIZ</option>
                <option value="GRADEDSURVEY">GRADED SURVEY</option>
                <option value="UNGRADEDSURVEY">UNGRADED SURVEY</option>
              </select>
            </div>
            <div className="d-flex mb-3">
              <label htmlFor="wd-group" className="align-content-center text-end pe-3" style={{width:"200px"}}>Assignment Group</label>
              <select defaultValue={quiz.assignGroup} id="wd-group" className="form-control" onChange={(e) => setQuiz({ ...quiz, assignGroup: e.target.value })}>
                <option value="QUIZZES">QUIZZES</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="EXAMS"> EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </div>
            <div className="d-flex mb-3">
              <label className="align-content-center text-end pe-3" style={{width:"200px"}}></label>
              <div className="d-flex flex-column mb-3 form-control">
                <b>Options</b>
                <div className="d-flex mb-2">
                  <input type="checkbox" checked={quiz.shuffle} name="check-answer" id="wd-shuffle-answers" onChange={(e) => setQuiz({ ...quiz, shuffle: e.target.checked })} className="me-2"/>
                  <label htmlFor="wd-shuffle-answers">Shuffle Answers</label>
                </div>
                <div className="d-flex mb-2">
                  <input type="number" min="0" max="120" name="check-time" defaultValue={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} id="wd-time-limit" className="form-control w-25 me-2"/>
                  <label htmlFor="wd-time-limit" className="align-content-center">Time Limit (0 for no time limit)</label>
                </div>
                <div className="d-flex form-control mb-2">
                  <input type="checkbox" checked={quiz.multipleAttemptsAllowed} onChange={(e) => setQuiz({ ...quiz, multipleAttemptsAllowed: e.target.checked })} name="check-attempts" id="wd-multiple-attempts" className="me-2 align-content-center text-center"/>
                  <label htmlFor="wd-multiple-attempts" className="align-content-center text-center me-4">Allow Multiple Attempts</label>
                  <input type="number" defaultValue={quiz.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.value })} className="form-control w-25 me-1" id="wd-attempt-number" min="1"/>
                  <label htmlFor="wd-attempt-number" className="align-content-center text-center">Number of Attempts</label>
                </div>
                <div className="d-flex mb-2">
                  <input type="checkbox" checked={quiz.showCorrect} onChange={(e) => setQuiz({ ...quiz, showCorrect: e.target.checked })} name="check-correct" id="wd-correct-answers" className="me-2"/>
                  <label htmlFor="wd-correct-answers">Show Correct Answers</label>
                </div>
                <div className="d-flex mb-2">
                  <input name="check-time" defaultValue={quiz.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} id="wd-access-code" className="form-control w-25 me-2"/>
                  <label htmlFor="wd-access-code" className="align-content-center">Access Code (Leave blank for no code)</label>
                </div>
                <div className="d-flex mb-2">
                  <input type="checkbox" checked={quiz.singleQuestion} onChange={(e) => setQuiz({ ...quiz, singleQuestion: e.target.checked })} name="check-single-question" id="wd-single-question" className="me-2"/>
                  <label htmlFor="wd-single-question">One Question at a Time</label>
                </div>
                <div className="d-flex mb-2">
                  <input type="checkbox" checked={quiz.webcamRequired} onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} name="check-webcam" id="wd-webcam" className="me-2"/>
                  <label htmlFor="wd-webcam">Webcam Required</label>
                </div>
                <div className="d-flex mb-2">
                  <input type="checkbox" checked={quiz.questionLock} onChange={(e) => setQuiz({ ...quiz, questionLock: e.target.checked })} name="check-lock" id="wd-lock-questions" className="me-2"/>
                  <label htmlFor="wd-lock-questions">Lock Questions After Answering</label>
                </div>
              </div>
            </div>
            <div className="d-flex mb-3">
              <label htmlFor="wd-assign-to" className="text-end pe-3" style={{width:"200px"}}>Assign</label>
              <div className="d-flex flex-column mb-3 form-control">
                <div className="d-flex flex-column mb-3">
                  <label htmlFor="wd-assign-to">Assign to</label>
                  <input type="text" id="wd-assign-to" placeholder="Everyone" className="form-control"/>
                </div>
                <div className="f-flex flex-column mb-3">
                  <label htmlFor="wd-due-date">Due</label>
                  <input id="wd-due-date" type="date"
                    defaultValue={quiz.dueshort} onChange={(e) => setQuiz({ ...quiz, dueshort: e.target.value })} className="form-control"/>
                </div>
                <div className="d-flex mb-3">
                    <div className="d-flex flex-column me-1 w-50">
                      <label htmlFor="wd-available-from">Available from</label>
                      <input id="wd-available-from" type="date"
                        defaultValue={quiz.startshort} onChange={(e) => setQuiz({ ...quiz, startshort: e.target.value })} className="form-control"/>
                    </div>
                  <div className="d-flex flex-column w-50">
                    <label htmlFor="wd-available-until">Until</label>
                    <input id="wd-available-until" type="date"
                      defaultValue={quiz.untilshort} onChange={(e) => setQuiz({ ...quiz, untilshort: e.target.value })} className="form-control"/>
                  </div>
                </div>
              </div>
            </div>
          </div>}
          {!detailMode && <div className="m-auto mt-3 d-flex flex-column w-75 justify-content-center align-items-center">
            {questions.map((question:any) => {
              if(question._id == editingQuestion)
                return (
                  <QuestionEditor 
                  question={question}
                  removeQuestion={removeQuestion}
                  saveQuestion={saveQuestion}
                  setEditingQuestion={setEditingQuestion}
                  />
                )
                else
                return(
                <QuestionPreview question={question} setEditingQuestion={setEditingQuestion}/>
                )
            })}
            <button className="btn btn-secondary" onClick={() => createQuestionForQuiz()}>+ Add Question</button>
          </div>}
          <hr/>

          <Link id="wd-save" type="button" onMouseOver={async () => setQuiz({ ...quiz, published: true, questionCount: await quizzesClient.findQuestionCountForQuiz(quiz._id) })} onClick={() =>{saveQuiz({ ...quiz})}} 
            className="btn btn-lg btn-success float-end ms-1" to={"/Kanbas/Courses/"+ cid +"/Quizzes"}>Save and Publish</Link>
          <button id="wd-save" type="button" onMouseOver={async () => setQuiz({ ...quiz, published: false, questionCount: await quizzesClient.findQuestionCountForQuiz(quiz._id) })} onClick={(e) =>  {
            saveQuizButton(true)
          }} 
            className="btn btn-lg btn-info float-end ms-1"> Save </button>
          <Link id="wd-cancel" type="button" className="btn btn-lg btn-secondary float-end" to={"/Kanbas/Courses/"+ cid +"/Quizzes"}> Cancel </Link> 
        </div>
  </div>
)
;}
  