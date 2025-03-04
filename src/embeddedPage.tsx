import React, {useEffect, useRef, useState} from "react";
import {createQuestionType, Question, QuestionTypes, Settings} from "@/dataTypes/questionTypes/basicQuestion.ts";
import {FillInTheBlank, FillInTheBlankOptionAnswer} from "@/dataTypes/questionTypes/fillInTheBlank.ts";
import {AdditionalData} from "@/dataTypes/additionalData.ts";
import {StudentResponse} from "@/dataTypes/questionTypes/studentResponse.ts";
import {QuestionPage} from "@/components/questionComponent/questionPage.tsx";

const EmbeddedPage: React.FC = () => {
    // const [data, setData] = useState<string>("");
    // const dataRef = useRef<string>(""); // Ref to store the latest data because data for some reason is empty when we are sending the REQUEST_DATA

    const [studentResponse, setStudentResponse] = useState<StudentResponse<Question>[]>([]);
    const [additionalData, setAdditionalData] = useState<AdditionalData>();
    const [questionID, setQuestionID] = useState<string>();
    const [settings, setSettings] = useState<Settings>();
    const [error, setError] = useState<Error | null>(null);

    // Ref to store the latest state values
    const stateRef = useRef({
        studentResponse,
        additionalData,
        questionID,
    });

    // Update ref whenever state changes
    useEffect(() => {
        stateRef.current = {
            studentResponse,
            additionalData,
            questionID,
        };
    }, [studentResponse, additionalData, questionID]);

    const handleMessage = (event: MessageEvent) => {
        try {
            if (event.data?.type === "REQUEST_DATA") {
                // Use the latest state from ref
                const studentsAnswersMap =  stateRef.current.studentResponse.reduce((acc:Record<string, any>, value) => {
                    acc[value.question.id] = value.studentAnswer;
                    return acc;
                }, {});


                window.parent.postMessage(
                    {
                        type: "FROM_EMBEDDED_PAGE",
                        payload: JSON.stringify({
                            questionID: stateRef.current.questionID,
                            additionalData: {
                                ...stateRef.current.additionalData,
                                studentAnswers: studentsAnswersMap
                            }
                        })
                    },
                    "*"
                );
            } else if (event.data?.type === "SEND_DATA") {
                parseMessage(event.data.payload);
            }
        } catch (e) {
            setError(e as Error);
        }
    };

    // const handleMessage = (event: MessageEvent) => {
    //     try{
    //         if (event.data?.type === "REQUEST_DATA") {
    //             // Send data back to the parent
    //             window.parent.postMessage(
    //                 { type: "FROM_EMBEDDED_PAGE", payload: JSON.stringify({questionID:questionID, additionalData: {...additionalData, studentAnswers:studentResponse}}) },
    //                 "*"
    //             );
    //         }else if (event.data?.type === "SEND_DATA") {
    //             //Process data from parent
    //             parseMessage(event.data.payload);
    //         }
    //     }catch (e) {
    //         // @ts-ignore
    //         setError(e);
    //     }
    //
    // };

    const parseSetting = (parsedData: any) => {
        // let parsedData: any;
        //
        // try {
        //     parsedData = JSON.parse(rawJson);
        // } catch (error) {
        //     throw new Error("Invalid JSON: Unable to parse.");
        // }

        // Validate that parsedData has `settings` and `questions`
        if (!parsedData || typeof parsedData !== "object") {
            throw new Error("Invalid format: Missing 'settings' object.");
        }

        if (!Array.isArray(parsedData.questions)) {
            throw new Error("Invalid format: 'questions' must be an array.");
        }

        // Convert JSON data to strongly typed objects
        const questions: Question[] = parsedData.questions.map((q: any, index: number) => {
            try {
                return createQuestionType(q);
            } catch (error) {
                throw new Error(`Error processing question at index ${index}: ${(error as Error).message}`);
            }
        });

        // Return or store the validated `Settings` object
        const data: Settings = { questions:questions };

        // console.log(data);
        return data;
    };

    const parseAdditionalData = (parsedData: any): AdditionalData => {
        // Validate isSubmitted exists and is a boolean
        if (typeof parsedData.isSubmitted !== "boolean") {
            throw new Error("Invalid or missing 'isSubmitted'. Expected a boolean.");
        }

        // Validate studentAnswers exists and is an object (map)

        if (parsedData.studentAnswers !== undefined && typeof parsedData.studentAnswers !== "object") {
            throw new Error("Invalid or missing 'studentAnswers'. Expected an object.");
        }

        return {
            ...parsedData,
            isSubmitted: parsedData.isSubmitted,
            studentAnswers: parsedData.studentAnswers ?? {}
        };
    };


    const setValue = (id: string, value: any) => {
        setStudentResponse((prevResponses) =>
            prevResponses.map((response) =>
                response.question.id === id
                    ? { ...response, studentAnswer: value }
                    : response
            )
        );
        // console.log(studentResponse);
        // console.log(id);
        // console.log(value);
    };

    const parseMessage = (rawJson: any) =>{
        let parsedData: any;
        try{
            parsedData = JSON.parse(rawJson);
        }catch (e) {
            throw new Error("Invalid JSON: Unable to parse.");//throw error when message received from server is unable to be parsed
        }

        if (typeof parsedData.questionID !== "string") {
            throw new Error("Invalid or missing 'questionID'. Expected an string.");
        }

        if (typeof parsedData.settings !== "object") {
            throw new Error("Invalid or missing 'settings'. Expected an object.");
        }

        if (typeof parsedData.additionalData !== "object") {
            throw new Error("Invalid or missing 'additionalData'. Expected an object.");
        }

        const questionID = parsedData.questionID as string;
        const settings = parseSetting(parsedData.settings);
        const additionalData = parseAdditionalData(parsedData.additionalData);

        const studentResponseArray = settings.questions.map((question)=> {
            const questionId = question.id;
            let studentAnswer = additionalData.studentAnswers[questionId];
            if(question.type === QuestionTypes.FillInTheBlank){
                //fill all the options since its reliant on them
                const fillInQuestion = question as FillInTheBlank;
                const fillInAnswers = (studentAnswer ?? []) as FillInTheBlankOptionAnswer[];

                // Ensure all options have a corresponding answer
                const updatedAnswers = fillInQuestion.options.map((option) => {
                    // Check if there's an existing answer for this locationIndex
                    const existingAnswer = fillInAnswers.find(answer => answer.locationIndex === option.locationIndex);

                    // Return existing answer if found, otherwise return a blank answer
                    return existingAnswer ?? { locationIndex: option.locationIndex, option: undefined };
                });
                additionalData.studentAnswers[questionId] = updatedAnswers;
                studentAnswer = updatedAnswers;
            }
            const response:StudentResponse<Question> ={
                question:question,
                studentAnswer: studentAnswer,
                updateAnswer: (value: any) => setValue(questionId, value),
            };
            return response;
        });
        setQuestionID(questionID);
        setSettings(settings);
        setAdditionalData(additionalData);
        setStudentResponse(studentResponseArray);
    }


    useEffect(() => {
        // Set up a listener for messages
        window.addEventListener("message", handleMessage);


        // Clean up the listener on unmount
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);
    if (error!= null){
        return <div><h1>An error occurred loading this module: {error.message}</h1></div>
    }

    return <div className="flex items-center justify-center min-h-screen py-10 w-full">
        <div className="space-y-8 max-w-3xl w-full">
            <QuestionPage questions={studentResponse}
                          submitted={additionalData == undefined ? false : additionalData.isSubmitted}/>
        </div>
    </div>
        ;
        };

        export default EmbeddedPage;
