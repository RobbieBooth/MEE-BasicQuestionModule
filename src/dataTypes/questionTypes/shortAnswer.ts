import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface ShortAnswer extends BasicQuestion{
    type: QuestionTypes.ShortAnswer;
    answer?: string;
}