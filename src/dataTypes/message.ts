import {BasicQuestion} from "@/dataTypes/questionTypes/basicQuestion.ts";

export type Message = {
    studentQuestionAttemptUUID: string;
    questionTemplateUUID: string;
    moduleName: string;
    additionalData: Record<string, any>;
    settings: BasicQuestion[];
    questionSetting: null;//wont be used as it is only there due to inheritance on java side, will always be null
    flagged: boolean;
};