import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface LongAnswer extends BasicQuestion{
    type: QuestionTypes.LongAnswer;
    answer?: string;
}