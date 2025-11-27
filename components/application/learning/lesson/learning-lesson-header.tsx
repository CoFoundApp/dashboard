import { Badge } from "@/components/ui/badge";
import { formatMinutes } from "@/lib/utils";
import { Clock } from "lucide-react";

interface LearningLessonHeaderProps {
    estimatedMinutes: number;
    section: string;
    summary: string;
    title: string;
}

export default function LearningLessonHeader({ estimatedMinutes, section, summary, title }: LearningLessonHeaderProps) {
    return (
        <div className="space-y-4">
            <Badge>Section : {section}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">
                {title}
            </h1>
            <p className="text-base text-muted-foreground">
                {summary}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                {formatMinutes(estimatedMinutes)}
            </div>
        </div>
    );
}