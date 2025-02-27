
// import {Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@radix-ui/react-select";
import {
    FillInTheBlank,
    FillInTheBlankOption,
    FillInTheBlankOptionAnswer
} from "@/dataTypes/questionTypes/fillInTheBlank.ts";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {correctColour, incorrectColour, QuestionCard} from "@/components/questionComponent/QuestionCard.tsx";
import {SelectSeparator} from "@radix-ui/react-select";
import {Button} from "@/components/ui/button.tsx";
import {QuestionAnswerSection} from "@/components/questionComponent/answerSection.tsx";
import {Check, X} from "lucide-react";

const emptyOption = undefined;

export function FillInTheBlankQuestion({question, studentAnswer, questionSubmitted, setStudentAnswer}:{question:FillInTheBlank, studentAnswer: FillInTheBlankOptionAnswer[], questionSubmitted:boolean, setStudentAnswer: (answer:FillInTheBlankOptionAnswer[])=>void}) {
    const [allOptions, setAllOptions] = useState<string[]>([]);
    const [key, setKey] = useState(+new Date())

    // Get available options (exclude already selected ones)
    const getAvailableOptions = (currentSelectedOption:string|undefined) => {
        const selectedValues = Object.values(studentAnswer);
        const selectedOptions = selectedValues.map((option)=>option.option).filter((option) => option != undefined);
        const optionsLeft = allOptions.filter((option) => !selectedOptions.includes(option));
        if(currentSelectedOption != null && currentSelectedOption !== emptyOption){
            optionsLeft.push(currentSelectedOption);
        }
        return optionsLeft;//Add an option to have unselect options
    };

    // Handler to update selected options dynamically
    const handleSelectChange = (locationIndex:number, option:string| undefined) => {
        const newAnswers = studentAnswer.map((fillOption)=>{
            const newAnswer = fillOption;
            if(newAnswer.locationIndex === locationIndex){
                newAnswer.option = option === emptyOption ? undefined : option;//if they have chosen the blank option then they want to deselect option
            }
            return newAnswer;
        });
        setStudentAnswer(newAnswers);
    };

    useEffect(() => {
        setAllOptions(question.options.map((option) => option.option));
        setKey(+new Date());
    }, [question]);


    let output = [];
    let lastIndex = 0;

    studentAnswer.forEach((option, i) => {
        output.push(question.questionString.slice(lastIndex, option.locationIndex)); // Add text before input
        output.push(
            <div className="flex">
            <Select key={key+i} value={option.option} onValueChange={(value) => handleSelectChange(option.locationIndex, value)} disabled={questionSubmitted}>
                <SelectTrigger className="mx-2 w-32 border rounded-md p-2">
                    <SelectValue placeholder={option.option} />
                </SelectTrigger>
                <SelectContent>
                    {/*<SelectItem key={""} value={""}/>*/}
                    {getAvailableOptions(option.option).map((choice) => (
                        <SelectItem key={choice} value={choice}>
                            {choice}
                        </SelectItem>
                    ))}
                    <SelectSeparator />
                    <Button
                        className="w-full px-2"
                        // variant="secondary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSelectChange(option.locationIndex, undefined);
                            setKey(+new Date())
                        }}
                    >
                        Clear
                    </Button>
                </SelectContent>
            </Select>
                {questionSubmitted && (() => {
                    const correctOption = question.options.find(value => value.locationIndex === option.locationIndex)?.option;
                    return correctOption === option.option ? (
                            <Check className={`text-${correctColour}`}/>
                    ) : (
                        <X className={`text-${incorrectColour}`}/>
                    );
                })()}
            </div>
        );
        lastIndex = option.locationIndex; // Move the index forward
    });

    output.push(question.questionString.slice(lastIndex)); // Append remaining text

    //For when it is submitted
    const answer = insertOptionsIntoString(question.questionString, question.options);
    const studentQuestionAnswer = insertOptionsIntoString(question.questionString, studentAnswer);

    return (
        <QuestionCard title={question.question} description={question.description} isCorrect={questionSubmitted ? answer === studentQuestionAnswer : undefined}>
            <div className="flex">{output}</div>
            {questionSubmitted && (
                <QuestionAnswerSection answer={answer} studentAnswer={studentQuestionAnswer}/>
            )}
        </QuestionCard>
    );
}

function insertOptionsIntoString(questionString: string, options: { locationIndex: number; option?: string }[]): string {
    let result = questionString;
    let offset = 0; // Tracks the increasing length due to insertions

    //Sort options by locationIndex to ensure correct insertion order
    options.sort((a, b) => a.locationIndex - b.locationIndex);

    for (const { locationIndex, option } of options) {
        const adjustedIndex = locationIndex + offset; // Adjust index based on previous insertions
        result = result.slice(0, adjustedIndex) + option + result.slice(adjustedIndex);
        offset += option !== undefined ? option.length : 0; // Update offset for next insert
    }

    return result;
}
