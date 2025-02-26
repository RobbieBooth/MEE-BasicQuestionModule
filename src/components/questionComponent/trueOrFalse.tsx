import {MultipleChoice, MultipleChoiceOption} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {TrueOrFalse} from "@/dataTypes/questionTypes/trueOrFalse.ts";
import {MultipleChoiceQuestion} from "@/components/questionComponent/multipleChoice.tsx";
import {QuestionTypes} from "@/dataTypes/questionTypes/basicQuestion.ts";
import {v4 as uuidv4} from "uuid";

/**
 * We use the Multi choice options for the true or false since a true or false question is technically a choice of true or false.
 * @param question
 * @param studentAnswer
 * @param questionSubmitted
 * @param setStudentAnswer
 */
export function TrueOrFalseQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:TrueOrFalse, studentAnswer?:boolean, questionSubmitted:boolean, setStudentAnswer: (answer:boolean | undefined)=>void}) {

    const createMultiChoiceQuestion = (boolQuestion:TrueOrFalse):MultipleChoice => {
        //true is answer if its true and false is answer if its false so we have to not the false to say that's the answer
        const options:MultipleChoiceOption[] = [{
            option: "true",
            answer: question.answer,
        },
            {
                option: "false",
                answer: question.answer === undefined ? undefined : !question.answer,
            }
            ]
        return {
            id: uuidv4(),
            question: boolQuestion.question,
            description: boolQuestion.description,
            type: QuestionTypes.MultipleChoice,
            options: options,
        }
    }

    const setStudentAnswerMulti = (answer: string | undefined) =>{
        if(answer === "true"){
            setStudentAnswer(true);
            return;
        }
        if(answer === "false"){
            setStudentAnswer(false);
            return;
        }

        //unknown case so set to undefined
        setStudentAnswer(undefined);
    }

    return (
        <MultipleChoiceQuestion question={createMultiChoiceQuestion(question)} questionSubmitted={questionSubmitted} setStudentAnswer={setStudentAnswerMulti} studentAnswer={studentAnswer === undefined ? undefined : studentAnswer.toString()}/>
    );
}