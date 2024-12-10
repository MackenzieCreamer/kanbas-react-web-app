import react, { useEffect, useState, Component } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import * as questionsClient from "./client"
import * as answersClient from "./Answers/client"
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer, setAnswers, updateAnswer } from "./Answers/reducer";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function QuestionPreview({question, setEditingQuestion} : {question:any;setEditingQuestion:(questionId:string) => void;}) {
    const [answers, setAnswers] = useState<any>();
    const fetchAnswers = async () => {
        const answers = await questionsClient.findAnswersForQuestion(question._id as string);
        setAnswers(answers);
      };
      useEffect(() => {
        fetchAnswers();
      }, []);
    
    // console.log(question.title,question.correctChoices[0]._id)

    let content = {blocks:[],entityMap:{}};
    if(question.description.entityMap) {
      content = question.description;
    } else {
      content = {...question.description, entityMap:{}}
    }
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(content)));


  return (<div className="form-control mb-5 d-flex p-0 flex-column">
    <div className="d-flex align-items-center border-bottom border-secondary w-100 mt-2 ps-2 pe-2 pb-3">
        <input disabled type="text" value={question.title} className="form-control me-3"/>
        <select disabled value={question.questionType} className="form-control me-3">
                <option value="MC">Multiple Choice</option>
                <option value="TF">True/False</option>
                <option value="BLANK">Fill in the Blank</option>
        </select>
        <label htmlFor="wd-question-points">pts:</label>
        <input disabled id="wd-question-points" type="number" value={question.points} className="form-control me-3"/>
        <FaPencil className="w-25" onClick={() => setEditingQuestion(question._id)}></FaPencil>
    </div>
    <div className="d-flex flex-column align-items-center form-control h-100 ps-5 pe-5">
        {question.questionType == "MC" && <span>Enter your question and multiple answers, then select the one correct answer.</span>}
        {question.questionType == "TF" && <span>Enter your question text, then select if True or False is the correct answer.</span>}
        {question.questionType == "BLANK" && <span>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</span>}
        <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="form-control h-75 ms-4 me-4 mb-2"
                editorClassName="form-control h-50"
            />
        <div className="w-100">
            <div id={"Answers_" + question._id} className="d-flex flex-column w-25">
                {(question.questionType == "TF") && answers != undefined && answers.map((choice : any) => {
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
                            <input disabled type="radio" value={choice._id} defaultChecked={defaultChecked} name={question._id} id={choice._id+"_"+question._id} className="me-2"/>
                            <label htmlFor={choice._id+"_"+question._id}>{choice.answerContent}</label>
                        </div>
                    )}
                )}
                {(question.questionType == "MC") && answers != undefined && answers.map((choice : any) => {
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
                            <input type="radio" value={choice._id} defaultChecked={defaultChecked} name={question._id} id={choice._id+"_"+question._id} className="me-2" disabled/>
                            <input className="form-control me-3" value={choice.answerContent} disabled/>
                        </div>
                    )
                })}
                {(question.questionType == "BLANK") && answers != undefined && answers.map((choice : any) => 
                    <div className="d-flex mb-2 justify-content-center align-items-center">
                        <input disabled className="form-control me-3" value={choice.answerContent} />
                    </div>
                )}
            </div>
        </div>
    </div>
  </div>);
}
  