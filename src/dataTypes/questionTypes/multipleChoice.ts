import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface MultipleChoiceOption {
    answer?: boolean;
    option: string;
}

export interface MultipleChoice extends BasicQuestion{
    type: QuestionTypes.MultipleChoice;
    options: MultipleChoiceOption[];
}