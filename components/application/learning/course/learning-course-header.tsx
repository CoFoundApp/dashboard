import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseLevel } from "@/graphql/learning";
import { courseLevelLabels } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LearningCourseHeaderProps {
    title: string;
    subtitle: string;
    category: string;
    level: CourseLevel;
}

export default function LearningCourseHeader({
    title,
    subtitle,
    category,
    level,
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    {title}
                </h1>
                <p className="text-base text-muted-foreground">
                    {subtitle}
                </p>
                <div className="flex items-center gap-2">
                    {category && <Badge>{category}</Badge>}
                    <Badge variant="outline">{courseLevelLabels[level]}</Badge>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <Link href={`/learn`}>
                        Retour
                    </Link>
                </Button>
                <Button>Commencer maintenant</Button>
            </div>
        </div>
    );
}