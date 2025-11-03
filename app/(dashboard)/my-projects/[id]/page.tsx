import MyProjectsShowLayout from "@/components/application/my-projects/show/my-projects-show-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Mes projets",
}

export default async function MyProjectsShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <MyProjectsShowLayout projectId={id} />
    );
}