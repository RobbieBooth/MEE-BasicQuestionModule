import {BasicQuestion, QuestionTypes} from "./basicQuestion.ts";

export interface FillInTheBlankOption {
    locationIndex: number;
    option: string;
}

export interface FillInTheBlankOptionAnswer {
    locationIndex: number;
    option?: string;
}

export interface FillInTheBlank extends BasicQuestion{
    type: QuestionTypes.FillInTheBlank;
    options: FillInTheBlankOption[];
    questionString: string;
}