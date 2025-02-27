import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {clsx} from "clsx";

interface QuestionCardProps {
    title: string;
    description?: string;
    isCorrect?: boolean;//undefined when not answered
    children: React.ReactNode;
}

//Cant use these because of way css works where it cant have dynamic checks
export const correctColour = "green-500";
export const incorrectColour = "red-500";

export function QuestionCard({ title, description, isCorrect, children }: QuestionCardProps) {
    return (
        <Card className={clsx({
            [`border-green-500`]: isCorrect === true,
            [`border-red-500`]: isCorrect === false,
        })}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description != undefined && description != "" && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}