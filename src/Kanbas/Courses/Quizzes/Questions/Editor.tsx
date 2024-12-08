import react, { useEffect, useState, Component } from "react";
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// export default function QuizControlButtons({publishQuiz,quizId,setQuizId,deleteQuiz,quizTitle, titleState, setQuizTitle}:
//     {publishQuiz:(quiz:any[],published:boolean) => void;quizId:string;setQuizId: (_id: string) => void;deleteQuiz:(quizId: string) => void;quizTitle:string;titleState:string,setQuizTitle:(title:string)=>void;}) {

export default function QuestionEditor({question,removeQuestion,saveQuestion} : {question:any;removeQuestion:(questionId:string) => void;saveQuestion:(question : any[]) => void}) {
    const [questionFC,setQuestionFC] = useState(question)
    const cancelFunction = async (questionId : string) => {
        if(question.firstSave === false){
            if(question.description.entityMap) {
                content = question.description;
            } else {
            content = {...question.description, entityMap:{}}
            }
            setEditorState(EditorState.createWithContent(convertFromRaw(content)));
            setQuestionFC({ ...question, description: convertToRaw(editorState.getCurrentContent())})
        } else {
            removeQuestion(questionId)
        }
    }
    
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

    const typeChange = function (typeValue:any) {
        if(typeValue == "MC"){
            setQuestionFC({...questionFC, questionType: typeValue, choices: [], correctChoices: ["0"]})
        } else if (typeValue == "TF"){
            setQuestionFC({...questionFC, questionType: typeValue, choices: ["True","False"], correctChoices:["True"]})
        } else {
            setQuestionFC({...questionFC, questionType: typeValue, choices: [], correctChoices: []})
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
        <div id={"Answers_" + questionFC._id}>
            {(questionFC.questionType == "TF") && questionFC.choices.map((choice : string) => 
                <div className="d-flex mb-2">
                <input type="radio" value={choice} checked={choice===questionFC.correctChoices[0]} name={questionFC._id} id={choice+"_"+questionFC._id} onChange={(e) => {setQuestionFC({ ...questionFC, correctChoices: [e.target.value] })}} className="me-2"/>
                <label htmlFor={choice+"_"+questionFC._id}>{choice}</label>
                </div>
            )}
            {(questionFC.questionType == "MC") && questionFC.choices.map((choice : string) => {
                const positionalValue = questionFC.choices.indexOf(choice)
                return(
                    <div className="d-flex mb-2">
                    <input type="radio" value={choice} checked={choice==questionFC.correctChoices[0]} name={questionFC._id} id={choice+"_"+questionFC._id} onChange={(e) => {setQuestionFC({ ...questionFC, correctChoices: [e.target.value] })}} className="me-2"/>
                    </div>
                )
                
            })}
            {(questionFC.questionType == "BLANK") && questionFC.correctChoices.map((choice : string) => 
                <div className="d-flex mb-2">

                </div>
            )}
        </div>
        {(questionFC.questionType == "MC" || questionFC.questionType == "BLANK") &&
        <div className="btn btn-danger" onClick={() => setQuestionFC({...questionFC,choices:[...questionFC.choices, questionFC.choices.length]})}>
            Add another answer
        </div>
        }
        <div id={"buttonsFor_" + questionFC._id} className="d-flex w-100 justify-content-end align-items-center">
            <button id={"cancelFor_" + questionFC._id} onClick={() => {cancelFunction(question._id)}} className="btn btn-secondary me-1">Cancel</button>
            <button onClick={() => removeQuestion(question._id)} className="btn btn-danger me-1">Delete</button>
            <button onClick={() => saveQuestion({...questionFC,firstSave:false})} className="btn btn-success">Save</button>
        </div>
    </div>
  </div>);
}
  