"use client";

import { useQuery } from "@apollo/client/react";
import { GET_COURSES, GetCoursesResult } from "@/graphql/learning";
import { CourseFilters } from "./learning-filters";
import { GraduationCap, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LearningCourseCard from "./learning-course-card";

interface LearningListProps {
    filters: CourseFilters;
}

export default function LearningList({ filters }: LearningListProps) {
    const { data, loading, error } = useQuery<GetCoursesResult>(GET_COURSES, {
        variables: {
            filters: {
                text: filters.search || null,
            },
        },
        fetchPolicy: "network-only",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement des cours" />
                </div>
            </section>
        );
    }

    if (error || !data) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement des cours.
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

    const courses = data.courses.items;

    if (courses.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <GraduationCap className="size-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Aucun cours trouvé</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                        Essayez de modifier vos filtres pour découvrir plus de cours.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <LearningCourseCard
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>
        </div>
    );
}