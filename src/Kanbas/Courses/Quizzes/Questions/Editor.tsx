import react, { useEffect, useState, Component } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import * as questionsClient from "./client"
import * as answersClient from "./Answers/client"
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer, setAnswers, updateAnswer } from "./Answers/reducer";
import { FaTrash } from "react-icons/fa";

export default function QuestionEditor({question,removeQuestion,saveQuestion,setEditingQuestion} : {question:any;removeQuestion:(questionId:string) => void;saveQuestion:(question : any[]) => void;setEditingQuestion:(questionId:string) => void;}) {
    const [questionFC,setQuestionFC] = useState({...question})
    const { answers } = useSelector((state: any) => state.answersReducer);
    const [originalAnswers,setOriginalAnswers] = useState<any>([])
    const [correctChoices,setCorrectChoices] = useState<any>(question.correctChoices[0])
    const cancelFunction = async () => {
        for(const answer of answers){
            await removeAnswer(answer._id)
        }
        for(const answer of originalAnswers){
            await createAnswerForQuestion(answer)
        }
        dispatch(setAnswers(originalAnswers))
        setEditingQuestion("")
    }

    const dispatch = useDispatch();

    const fetchAnswers = async () => {
        const answers = await questionsClient.findAnswersForQuestion(question._id as string);
        dispatch(setAnswers(answers));
        setOriginalAnswers(answers)
      };
      useEffect(() => {
        fetchAnswers();
      }, []);
    
    let content = {blocks:[],entityMap:{}};
    if(questionFC.description.entityMap) {
      content = questionFC.description;
    } else {
      content = {...questionFC.description, entityMap:{}}
    }
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));
    const onEditorStateChange = function (editorState : any) {
      setQuestionFC({ ...questionFC, description: convertToRaw(editorState.getCurrentContent())})
      setEditorState(editorState);
    };


    const createAnswerForQuestion = async (passedAnswer:any) => {
        let utilizedAnswer;
        const newAnswer = { answerContent: "New Answer", question: question._id };
        if(passedAnswer==""){
            utilizedAnswer = newAnswer
        } else {
            utilizedAnswer = passedAnswer
        }
        const answer = await questionsClient.createAnswerForQuestion(question._id, utilizedAnswer);
        const answers = await questionsClient.findAnswersForQuestion(question._id as string);
        dispatch(setAnswers(answers));
        return answer;
      };

    const removeAnswer = async (answerId: string) => {
        await answersClient.deleteAnswer(answerId);
        dispatch(deleteAnswer(answerId));
    };

    const saveAnswer = async (answer: any) => {
        await answersClient.updateAnswer(answer);
        dispatch(updateAnswer(answer));
    };

    const saveQuestionOnPress = async (question:any) => {
        if(question.questionType == "BLANK"){
            question.correctChoices = answers
        } else {
            question.correctChoices = [{...correctChoices}];
        }
        saveQuestion(question)
        setEditingQuestion("");
    }

    const typeChange = async function (typeValue:any) {
        for(const answer of answers){
            await removeAnswer(answer._id)
        }
        if(typeValue == "MC"){
            setQuestionFC({...questionFC, questionType: typeValue, correctChoices: []})
        } else if (typeValue == "TF"){
            setQuestionFC({...questionFC, questionType: typeValue, correctChoices:[]})
            for(const answerChoice of ["False","True"]){
                const answer = createAnswerForQuestion({ answerContent: answerChoice, question: question._id })
            }
        } else {
            setQuestionFC({...questionFC, questionType: typeValue, correctChoices: []})
        }
    }

  return (<div className="form-control mb-5 d-flex p-0 flex-column">
    <div className="d-flex align-items-center border-bottom border-secondary w-100 mt-2 ps-2 pe-2 pb-3">
        <input type="text" value={questionFC.title} onChange={(e) => setQuestionFC({ ...questionFC, title: e.target.value })} className="form-control me-3"/>
        <select value={questionFC.questionType} className="form-control me-3" onChange={(e) => typeChange(e.target.value)}>
                <option value="MC">Multiple Choice</option>
                <option value="TF">True/False</option>
                <option value="BLANK">Fill in the Blank</option>
        </select>
        <label htmlFor="wd-question-points">pts:</label>
        <input id="wd-question-points" type="number" value={questionFC.points} onChange={(e) => setQuestionFC({ ...questionFC, points: e.target.value })} className="form-control me-3"/>
    </div>
    <div className="d-flex flex-column align-items-center form-control h-100 ps-5 pe-5">
        {questionFC.questionType == "MC" && <span>Enter your question and multiple answers, then select the one correct answer.</span>}
        {questionFC.questionType == "TF" && <span>Enter your question text, then select if True or False is the correct answer.</span>}
        {questionFC.questionType == "BLANK" && <span>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</span>}
        <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="form-control h-75 ms-4 me-4 mb-2"
                editorClassName="form-control h-50"
                onEditorStateChange={onEditorStateChange}
            />
        <div className="w-100">
            <div id={"Answers_" + question._id} className="d-flex flex-column w-25">
                {(questionFC.questionType == "TF") && answers.map((choice : any) => {
                    let defaultChecked;
                    if(question.correctChoices[0] === undefined || question.correctChoices[0] === null){
                        defaultChecked = false;
                    } else if (question.correctChoices[0]._id === undefined) {
                        defaultChecked = choice._id==question.correctChoices[0]
                    }
                    else {
                        defaultChecked = choice._id==question.correctChoices[0]._id
                    }
                    return(
                        <div className="d-flex mb-2">
                            <input type="radio" value={choice._id} defaultChecked={defaultChecked} name={questionFC._id} id={choice._id+"_"+questionFC._id} onChange={(e) => {setCorrectChoices(choice)}} className="me-2"/>
                            <label htmlFor={choice._id+"_"+questionFC._id}>{choice.answerContent}</label>
                        </div>
                    )}
                )}
                {(questionFC.questionType == "MC") && answers.map((choice : any) => {
                    let defaultChecked;
                    if(question.correctChoices[0] === undefined || question.correctChoices[0] === null){
                        defaultChecked = false;
                    } else if (question.correctChoices[0]._id === undefined) {
                        defaultChecked = choice._id==question.correctChoices[0]
                    }
                    else {
                        defaultChecked = choice._id==question.correctChoices[0]._id
                    }
                    return(
                        <div className="d-flex mb-2 justify-content-center align-items-center">
                            <input type="radio" value={choice._id} defaultChecked={defaultChecked} name={questionFC._id} id={choice._id+"_"+questionFC._id} onChange={(e) => {setCorrectChoices(choice)}} className="me-2"/>
                            <input className="form-control me-3" value={choice.answerContent} onChange={(e) => saveAnswer({...choice,answerContent:e.target.value})}/>
                            <FaTrash onClick={() => removeAnswer(choice._id)}></FaTrash>
                        </div>
                    )
                    
                })}
                {(questionFC.questionType == "BLANK") && answers.map((choice : any) => 
                    <div className="d-flex mb-2 justify-content-center align-items-center">
                        <input className="form-control me-3" value={choice.answerContent} onChange={(e) => saveAnswer({...choice,answerContent:e.target.value})}/>
                        <FaTrash onClick={() => removeAnswer(choice._id)}></FaTrash>
                    </div>
                )}
            </div>
            {(questionFC.questionType == "MC" || questionFC.questionType == "BLANK") && 
            <div className="w-100 m-3 d-flex flex-column justify-content-center align-items-center">
                <div className="btn btn-danger w-25" onClick={() => createAnswerForQuestion("")}>
                    Add another answer
                </div>
            </div>
            }
            <div id={"buttonsFor_" + questionFC._id} className="d-flex w-100 justify-content-end align-items-center">
                <button id={"cancelFor_" + questionFC._id} onClick={() => {cancelFunction()}} className="btn btn-secondary me-1">Cancel</button>
                <button onClick={() => {setEditingQuestion(""); removeQuestion(question._id)}} className="btn btn-danger me-1">Delete</button>
                <button onClick={() => saveQuestionOnPress({...questionFC,firstSave:false})} className="btn btn-success">Save</button>
            </div>
        </div>
    </div>
  </div>);
}
  