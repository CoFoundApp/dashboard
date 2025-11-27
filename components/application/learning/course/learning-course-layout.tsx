"use client";

import { GET_COURSE_BY_SLUG, GetCourseBySlugResult } from "@/graphql/learning";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import LearningCourseHeader from "./learning-course-header";
import LearningCourseDescription from "./learning-course-description";
import LearningCourseContent from "./learning-course-content";

interface LearningCourseLayoutProps {
    slug: string;
}

export default function LearningCourseLayout({ slug }: LearningCourseLayoutProps) {
    const { data, loading, error } = useQuery<GetCourseBySlugResult>(GET_COURSE_BY_SLUG, {
        variables: {
            slug: slug
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
    
    return (
        <section className="space-y-12">
            <LearningCourseHeader
                category={data.course.category}
                subtitle={data.course.subtitle}
                level={data.course.level}
                title={data.course.title}
            />
            <LearningCourseDescription description={data.course.description} />
            <LearningCourseContent sections={data.course.sections} />
        </section>
    );
}