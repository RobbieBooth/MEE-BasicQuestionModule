import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {QuestionCard} from "@/components/questionComponent/QuestionCard.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Check, X} from "lucide-react";
import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {Input} from "@/components/ui/input.tsx";

export function ShortAnswerQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:ShortAnswer, studentAnswer?:string, questionSubmitted:boolean, setStudentAnswer: (answer:string | undefined)=>void}) {

    return (
        <QuestionCard title={question.question} description={question.description}>
            <Input value={studentAnswer} onChange={(e) => {
                e.preventDefault();
                setStudentAnswer(e.target.value);
            }} disabled={questionSubmitted}/>
        </QuestionCard>
    );
}