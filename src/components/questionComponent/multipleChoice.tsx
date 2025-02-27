import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {Check, X} from "lucide-react";
import {correctColour, incorrectColour, QuestionCard} from "@/components/questionComponent/QuestionCard.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import {QuestionAnswerSection} from "@/components/questionComponent/answerSection.tsx";


export function MultipleChoiceQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:MultipleChoice, studentAnswer?:string, questionSubmitted:boolean, setStudentAnswer: (answer:string | undefined)=>void}) {
    const [questionID, setQuestionID] = useState<string>(uuidv4());

    const answer = question.options.find(option => option.answer)?.option;

    return (
        <QuestionCard title={question.question} description={question.description} isCorrect={questionSubmitted && answer!=undefined ? studentAnswer === answer : undefined}>
            <RadioGroup disabled={questionSubmitted} value={studentAnswer} onValueChange={setStudentAnswer} name={question.question}>
                {question.options.map((option, index) => {
                    // @ts-ignore
                    const selectedOption = studentAnswer!== undefined && studentAnswer === option.option;
                    // console.log("multi answer",studentAnswer);
                    return <div className="flex items-center space-x-2" key={index}>
                        <input
                            type="radio"
                            name={questionID}
                            value={option.option}
                            checked={selectedOption}
                            disabled={questionSubmitted}
                            onChange={(e) => setStudentAnswer(e.target.value)}

                        />
                        {/*<RadioGroupItem value={option.option} id={option.option} radioGroup={question.question}*/}
                        {/*                checked={selectedOption}/>*/}
                        <Label htmlFor={option.option}>{option.option}</Label>
                        {(questionSubmitted && selectedOption) && (
                            option.answer ?
                                <Check className={`text-${correctColour}`}/>
                                :
                                <X className={`text-${incorrectColour}`}/>
                        )}
                    </div>
                })}
            </RadioGroup>
            {questionSubmitted && (
                <QuestionAnswerSection answer={answer}  studentAnswer={studentAnswer}/>
            )}
        </QuestionCard>
    );
}