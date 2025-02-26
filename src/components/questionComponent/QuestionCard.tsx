import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface QuestionCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function QuestionCard({ title, description, children }: QuestionCardProps) {
    return (
        <Card>
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