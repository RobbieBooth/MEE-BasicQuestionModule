import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface Numerical extends BasicQuestion{
    type: QuestionTypes.Numerical;
    answer?: number;
}