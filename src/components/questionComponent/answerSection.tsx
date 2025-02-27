import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";

export function QuestionAnswerSection({answer, studentAnswer}:{answer?:string, studentAnswer?:string}) {

    return (
        <div className="pt-3">
            <p>
                Answer: {answer || "No answer found"}
            </p>
            <p>
                Your Answer: {studentAnswer || "No student answer found"}
            </p>
        </div>
    )
}