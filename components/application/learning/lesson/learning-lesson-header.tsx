import { Badge } from "@/components/ui/badge";

interface LearningLessonHeaderProps {
    section: string;
    summary: string;
    title: string;
}

export default function LearningLessonHeader({ section, summary, title }: LearningLessonHeaderProps) {
    return (
        <div className="space-y-4">
            <Badge>Section : {section}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>
            <p className="text-base text-muted-foreground">
                {summary}
            </p>
        </div>
    );
}