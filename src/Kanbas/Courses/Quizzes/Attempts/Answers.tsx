import { useEffect, useState } from "react";
import * as questionsClient from "../Questions/client"

export function Answers({question, questionNumber,setAnswer} : {question:any;questionNumber:number;setAnswer:(questionNumber:number,answer:any) => void;}) {
    const [listedAnswers, setListedAnswers] = useState<any>([]);
    const fetchAnswers = async () => {
        const answers = await questionsClient.findAnswersForQuestion(question._id as string);
        setListedAnswers(answers);
      };
      useEffect(() => {
        fetchAnswers();
      }, []);

    return(
        <div>
            {(question.questionType==="MC" || question.questionType==="TF") && 
            listedAnswers.map((answer:any)=>{
                return(
                    <div>
                        <input type="radio" className="form-check-input ms-1" id={answer._id} name={question._id} onClick={() => setAnswer(questionNumber,answer)}/>
                        <label htmlFor={answer._id} className="form-check-label ms-1" onClick={() => setAnswer(questionNumber,answer)}>
                            {answer.answerContent}
                        </label>
                        <hr className="p-0 mb-1"/>
                    </div>
                )
            })}
            {(question.questionType==="BLANK") && 
            <div>
                <input className="form-control w-25" onChange={(e) => setAnswer(questionNumber,e.target.value)}/>
            </div>
            }
        </div>
    )
}