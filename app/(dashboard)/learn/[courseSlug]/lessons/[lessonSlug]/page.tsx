import LearningLessonLayout from "@/components/application/learning/lesson/learning-lesson-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - eLearning",
}

export default async function LessonPage({ params }: { params: Promise<{ courseSlug: string, lessonSlug: string }> }) {
    const { courseSlug, lessonSlug } = await params;

    return (
        <LearningLessonLayout courseSlug={courseSlug} lessonSlug={lessonSlug} />
    );
}