export type StudentAnswers = Record<string, any>; // Maps question IDs/types to answers

export interface AdditionalData {
    isSubmitted: boolean;
    studentAnswers: StudentAnswers;
}
