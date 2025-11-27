import LearningLayout from "@/components/application/learning/learning-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Liste des cours",
}

export default function LearningPage() {
    return <LearningLayout />;
}