import {Numerical} from "@/dataTypes/questionTypes/numerical.ts";
import {LongAnswer} from "@/dataTypes/questionTypes/longAnswer.ts";
import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {TrueOrFalse} from "@/dataTypes/questionTypes/trueOrFalse.ts";
import {FillInTheBlank, FillInTheBlankOptionAnswer} from "@/dataTypes/questionTypes/fillInTheBlank.ts";
import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {Question, QuestionTypes} from "@/dataTypes/questionTypes/basicQuestion.ts";
import {MultipleChoiceQuestion} from "@/components/questionComponent/multipleChoice.tsx";
import {FillInTheBlankQuestion} from "@/components/questionComponent/fillInTheBlank.tsx";
import {TrueOrFalseQuestion} from "@/components/questionComponent/trueOrFalse.tsx";
import {ShortAnswerQuestion} from "@/components/questionComponent/shortAnswer.tsx";
import {LongAnswerQuestion} from "@/components/questionComponent/longAnswer.tsx";
import {NumericalQuestion} from "@/components/questionComponent/numerical.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {StudentResponse} from "@/dataTypes/questionTypes/studentResponse.ts";

const QuestionRenderer: React.FC<{ question:StudentResponse<Question>, submitted:boolean }> = ({ question, submitted }) => {
    const actualQuestion = question.question;
    switch (actualQuestion.type) {
        case QuestionTypes.MultipleChoice:
            return <MultipleChoiceQuestion question={actualQuestion as MultipleChoice} questionSubmitted={submitted} studentAnswer={question.studentAnswer as string | undefined} setStudentAnswer={question.updateAnswer}/>;
        case QuestionTypes.FillInTheBlank:
            return <FillInTheBlankQuestion question={actualQuestion as FillInTheBlank} questionSubmitted={submitted} studentAnswer={question.studentAnswer as FillInTheBlankOptionAnswer[]} setStudentAnswer={question.updateAnswer}/>;
        case QuestionTypes.TrueOrFalse:
            return <TrueOrFalseQuestion question={actualQuestion as TrueOrFalse} questionSubmitted={submitted} studentAnswer={question.studentAnswer as boolean | undefined} setStudentAnswer={question.updateAnswer}/>;
        case QuestionTypes.ShortAnswer:
            return <ShortAnswerQuestion question={actualQuestion as ShortAnswer} questionSubmitted={submitted} studentAnswer={question.studentAnswer as string | undefined} setStudentAnswer={question.updateAnswer}/>;
        case QuestionTypes.LongAnswer:
            return <LongAnswerQuestion question={actualQuestion as LongAnswer} questionSubmitted={submitted} studentAnswer={question.studentAnswer as string | undefined} setStudentAnswer={question.updateAnswer}/>;
        case QuestionTypes.Numerical:
            return <NumericalQuestion question={actualQuestion as Numerical} questionSubmitted={submitted} studentAnswer={question.studentAnswer as number | undefined} setStudentAnswer={question.updateAnswer}/>;
        default:
            return <div>Error: Unknown Question Type</div>;
    }
};

interface QuestionPageProps {
    questions: StudentResponse<Question>[];
    submitted: boolean;
}

export function QuestionPage({ questions, submitted }: QuestionPageProps) {
    return (
        questions.map((question, index) => (
            <div key={index} className="block">
                <QuestionRenderer question={question}  submitted={submitted}/>
            </div>

        ))
    );
}