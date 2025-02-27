import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {QuestionCard} from "@/components/questionComponent/QuestionCard.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {LongAnswer} from "@/dataTypes/questionTypes/longAnswer.ts";
import {QuestionAnswerSection} from "@/components/questionComponent/answerSection.tsx";

export function LongAnswerQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:LongAnswer, studentAnswer?:string, questionSubmitted:boolean, setStudentAnswer: (answer:string | undefined)=>void}) {

    return (
        <QuestionCard title={question.question} description={question.description} isCorrect={questionSubmitted && question.answer!=undefined ? studentAnswer === question.answer : undefined}>
            <Textarea value={studentAnswer} onChange={(e) => {
                e.preventDefault();
                setStudentAnswer(e.target.value);
            }} disabled={questionSubmitted}/>
            {questionSubmitted && (
                <QuestionAnswerSection answer={question.answer} studentAnswer={studentAnswer}/>
            )}
        </QuestionCard>
    );
}