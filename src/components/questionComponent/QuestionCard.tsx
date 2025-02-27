import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface QuestionCardProps {
    title: string;
    description?: string;
    isCorrect?: boolean;//undefined when not answered
    children: React.ReactNode;
}

export const correctColour = "green-500";
export const incorrectColour = "red-500";

export function QuestionCard({ title, description, isCorrect, children }: QuestionCardProps) {
    return (
        <Card className={isCorrect === undefined ? "" : (isCorrect ? `border-${correctColour}` :`border-${incorrectColour}`)} >
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