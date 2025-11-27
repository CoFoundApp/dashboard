import LearningCourseLayout from "@/components/application/learning/course/learning-course-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Liste des cours",
}

export default async function CoursePage({ params }: { params: Promise<{ courseSlug: string }> }) {
    const { courseSlug } = await params;

    return (
        <LearningCourseLayout slug={courseSlug} />
    );
}