import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {QuestionCard} from "@/components/questionComponent/QuestionCard.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Numerical} from "@/dataTypes/questionTypes/numerical.ts";

export function NumericalQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:Numerical, studentAnswer?:number, questionSubmitted:boolean, setStudentAnswer: (answer:number | undefined)=>void}) {

    return (
        <QuestionCard title={question.question} description={question.description}>
            <Input value={studentAnswer} onChange={(e) => {
                e.preventDefault();
                setStudentAnswer(Number(e.target.value));
            }} disabled={questionSubmitted} type={"number"}/>
        </QuestionCard>
    );
}