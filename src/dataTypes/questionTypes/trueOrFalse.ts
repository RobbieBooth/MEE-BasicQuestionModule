import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface TrueOrFalse extends BasicQuestion{
    type: QuestionTypes.TrueOrFalse;
    answer?: boolean;
}