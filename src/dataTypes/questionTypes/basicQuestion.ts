import {MultipleChoice} from "@/dataTypes/questionTypes/multipleChoice.ts";
import {FillInTheBlank} from "@/dataTypes/questionTypes/fillInTheBlank.ts";
import {TrueOrFalse} from "@/dataTypes/questionTypes/trueOrFalse.ts";
import {ShortAnswer} from "@/dataTypes/questionTypes/shortAnswer.ts";
import {LongAnswer} from "@/dataTypes/questionTypes/longAnswer.ts";
import {Numerical} from "@/dataTypes/questionTypes/numerical.ts";
import {v4 as uuidv4} from "uuid";

export enum QuestionTypes {
    FillInTheBlank = "FillInTheBlank",
    LongAnswer = "LongAnswer",
    MultipleChoice = "MultipleChoice",
    Numerical = "Numerical",
    ShortAnswer = "ShortAnswer",
    TrueOrFalse = "TrueOrFalse",
}

export interface BasicQuestion {
    id: string,
    question: string;
    description: string;
    type: QuestionTypes;
}

// Union type for all possible question types
export type Question =
    | MultipleChoice
    | FillInTheBlank
    | TrueOrFalse
    | ShortAnswer
    | LongAnswer
    | Numerical;

// Type for the settings object
export type Settings = {
    questions: Question[];
};

export function createQuestionType (json:any):Question {
    const basicData:BasicQuestion={
        id: json.id ?? uuidv4(),
        question: json.question,
        description: json.description,
        type: json.type as QuestionTypes,
    }

    switch(json.type) {
        case QuestionTypes.MultipleChoice:
            return {
                ...basicData,
                options: json.options
            } as MultipleChoice;
        case QuestionTypes.Numerical:
            return {
                ...basicData,
                answer: json.answer,
            } as Numerical;
        case QuestionTypes.FillInTheBlank:
            return {
                ...basicData,
                questionString: json.questionString,
                options: json.options
            } as FillInTheBlank;
        case QuestionTypes.LongAnswer:
            return {
                ...basicData,
                answer: json.answer,
            } as LongAnswer;
        case QuestionTypes.ShortAnswer:
            return {
                ...basicData,
                answer: json.answer
            } as ShortAnswer;
        case QuestionTypes.TrueOrFalse:
            return {
                ...basicData,
                answer: json.answer
            } as TrueOrFalse;
        default:
            throw new Error("Unknown Question Type");
    }
}

