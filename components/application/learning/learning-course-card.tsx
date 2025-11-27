import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLevelLabels, formatMinutes } from "@/lib/utils";
import { Clock, List } from "lucide-react";
import Link from "next/link";

interface LearningCourseCardProps {
    course: {
        id: string;
        title: string;
        subtitle: string;
        category: string;
        estimatedMinutes: number;
        level: "ADVANCED" | "BEGINNER" | "INTERMEDIATE";
        sections: Array<{
            id: string;
        }>;
        slug: string;
    }
}

export default function LearningCourseCard({ course }: LearningCourseCardProps) {

    return (
        <Link href={`/learn/${course.slug}`} className="block">
            <Card className="overflow-hidden pt-0 transition-colors hover:border-foreground/20">
                <div className="relative h-48 w-full">
                    <img
                        src="/imports/logo.png"
                        alt="Git de A à Z"
                        className="h-full w-full object-cover object-center"
                    />
                    <Badge variant="secondary" className="absolute top-4 right-4">{courseLevelLabels[course.level]}</Badge>
                </div>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-balance">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">{course.subtitle}</p>
                    {course.category && <Badge>{course.category}</Badge>}
                </CardHeader>
                <CardFooter className="flex items-center justify-between border-t">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-4" />
                        {formatMinutes(course.estimatedMinutes)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <List className="size-4" />
                        {course.sections.length} modules
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}