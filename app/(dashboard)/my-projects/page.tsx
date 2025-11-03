import MyProjectsLayout from "@/components/application/my-projects/my-projects-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mes projets",
}

export default function MyProjectsPage() {
    return (
        <MyProjectsLayout />
    );
}