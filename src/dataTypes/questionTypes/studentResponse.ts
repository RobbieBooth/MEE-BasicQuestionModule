import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {Question} from "@/dataTypes/questionTypes/basicQuestion.ts";
import {FillInTheBlank, FillInTheBlankOptionAnswer} from "@/dataTypes/questionTypes/fillInTheBlank.ts";
import {TrueOrFalse} from "@/dataTypes/questionTypes/trueOrFalse.ts";
import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {LongAnswer} from "@/dataTypes/questionTypes/longAnswer.ts";
import {Numerical} from "@/dataTypes/questionTypes/numerical.ts";

export type StudentResponse<T extends Question> = {
    question: T;
    studentAnswer: T extends MultipleChoice
        ? string | undefined// Selected option
        : T extends FillInTheBlank
            ? FillInTheBlankOptionAnswer[] // Array of filled blanks
            : T extends TrueOrFalse
                ? boolean | undefined // True/False
                : T extends ShortAnswer
                    ? string | undefined // Short text response
                    : T extends LongAnswer
                        ? string | undefined // Long text response
                        : T extends Numerical
                            ? number | undefined // Numerical answer
                            : never; // Default case (should never happen)
    updateAnswer: (newAnswer: StudentResponse<T>["studentAnswer"]) => void;
};
