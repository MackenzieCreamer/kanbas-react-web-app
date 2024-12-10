import { useEffect, useState } from "react";
import * as questionsClient from "../Questions/client"
import * as answersClient from "../Questions/Answers/client"

export function AnswersReview({question,responseAnswer} : {question:any;responseAnswer:string}) {
    const [listedAnswers, setListedAnswers] = useState<any>([]);
    const [blankStyle,setBlankStyle] = useState("bg-danger form-control w-25")
    const [stylingOfChoices,setChoiceStyle] = useState("")
    const [responseText,setResponseText] = useState<any>("")
    const [styled,setStyled] = useState(0)
    const MAX_RERENDERS = 5
    const fetchAnswers = async () => {
        const answers = await questionsClient.findAnswersForQuestion(question._id as string);
        setListedAnswers(answers);
        if(question.questionType === "BLANK"){
            for(const answer of answers){
                if(answer._id === responseAnswer){
                    setBlankStyle("bg-success form-control w-25")
                    break;
                }
            }
        }
    };
    useEffect(() => {
    fetchAnswers();
    }, []);

    const setStyledText = async (question:any) => {
        if(responseAnswer !== undefined){
            if(question.questionType !=="BLANK") {
                const answer = await answersClient.findAnswerById(responseAnswer)
                if(question.correctChoices[0]===responseAnswer){
                    if(styled<MAX_RERENDERS){
                        setChoiceStyle("bg-success rounded")
                        setStyled(styled+1)
                    }
                } else if (question.correctChoices[0]!==responseAnswer){
                    if(styled<MAX_RERENDERS){
                        setChoiceStyle("bg-danger rounded")
                        setStyled(styled+1)
                    }
                } 
            } else{
            if(styled<MAX_RERENDERS){
                    const answers = await questionsClient.findAnswersForQuestion(question._id as string);
                    const answerContent = await answersClient.findAnswerById(responseAnswer)
                    setResponseText(answerContent[0].answerContent)
                    console.log(question.correctChoices, responseAnswer,answerContent[0])
                    for(const answer of answers){
                        if(question.correctChoices.includes(responseAnswer)){
                            setBlankStyle("bg-success form-control w-25")
                            break;
                        }
                    }
                    setStyled(styled+1)
                }
            }
        }
    }

    if(question.questionType === "BLANK"){
        // console.log(question)
        setStyledText(question)
    }

    return(
        <div>
            {(question.questionType==="MC" || question.questionType==="TF") && 
            listedAnswers.map((answer:any)=>{
                let checked;
                if(question.correctChoices[0]._id===responseAnswer && responseAnswer===answer._id){
                    checked=true
                } else if (question.correctChoices[0]._id!==responseAnswer && responseAnswer===answer._id){
                    checked=true
                } else {
                    checked=false
                }
                setStyledText(question)
                return(
                    <div>
                        <div className={checked ? stylingOfChoices : ""}>
                            <input disabled type="radio" checked={checked} className="form-check-input ms-1" id={answer._id} name={question._id}/>
                            <label htmlFor={answer._id} className="ms-1 form-check-label">
                                {answer.answerContent}
                            </label>
                        </div>
                        <hr className="p-0 mb-1"/>
                    </div>
                )
            })}
            {(question.questionType==="BLANK") && 
            (<div>
                <input disabled value={responseText} className={blankStyle}/>
            </div>)
            }
        </div>
    )
}