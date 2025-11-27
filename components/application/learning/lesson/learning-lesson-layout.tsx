"use client";

import { GET_COURSE_LESSONS, GetCourseLessonsResult } from "@/graphql/learning";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import LearningLessonHeader from "./learning-lesson-header";

interface LearningLessonLayoutProps {
    courseSlug: string;
    lessonSlug: string;
}

export default function LearningLessonLayout({ courseSlug, lessonSlug }: LearningLessonLayoutProps) {
    const { data, loading, error } = useQuery<GetCourseLessonsResult>(GET_COURSE_LESSONS, {
        variables: {
            slug: courseSlug,
        },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement du cours" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.course) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement du cours.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm underline underline-offset-4"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    const sections = data.course.sections;

    const section = sections.find((s) =>
        s.lessons.some((lesson) => lesson.slug === lessonSlug)
    );

    const lesson = section?.lessons.find((lesson) => lesson.slug === lessonSlug);

    if (!section || !lesson) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Cette leçon est introuvable.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-12">
            <LearningLessonHeader
                section={section.title}
                title={lesson.title}
                summary={lesson.summary}
                estimatedMinutes={lesson.estimatedMinutes}
            />
        </section>
    );
}
