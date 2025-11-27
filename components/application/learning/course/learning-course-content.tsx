"use client";

import { formatMinutes } from "@/lib/utils";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface LearningCourseContentProps {
    sections: Array<{
        id: string;
        lessons: Array<{
            estimatedMinutes: number;
            slug: string;
            title: string;
        }>;
        position: number;
        title: string;
    }>;
}

export default function LearningCourseContent({ sections }: LearningCourseContentProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id)
    }

    const sortedSections = [...sections].sort((a, b) => a.position - b.position);

    const totalMinutes = sections.reduce(
        (acc, section) =>
            acc + section.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0),
        0
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight">Contenu du cours</h2>
                <p className="text-muted-foreground">
                    {sortedSections.length} modules • {formatMinutes(totalMinutes)}
                </p>
            </div>
            <div className="bg-muted/30 rounded-xl border border-border overflow-hidden">
                {sortedSections.map((section, index) => (
                    <div key={section.id} className={index !== 0 ? "border-t border-border" : ""}>
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center gap-4 p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                            <div
                                className={`flex items-center justify-center size-8 rounded-full text-white font-semibold bg-primary`}
                            >
                                {section.position}
                            </div>
                            <span className="flex-1 text-left font-semibold text-foreground">{section.title}</span>
                            {expandedSection === section.id ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                        </button>
                        {expandedSection === section.id && section.lessons && (
                            <div className="bg-background/50 px-6 pb-4">
                                {section.lessons.map((lesson, lessonIndex) => (
                                    <Link
                                        key={lessonIndex}
                                        href={`${pathname}/lessons/${lesson.slug}`}
                                        className="flex items-center gap-2 py-4 hover:bg-muted/30 px-4 -mx-4 rounded-lg transition-colors cursor-pointer group"
                                    >
                                        <PlayCircle className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        <span className="flex-1 text-foreground">{lesson.title}</span>
                                        <span className="text-muted-foreground text-sm">{formatMinutes(lesson.estimatedMinutes)}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}