import ProjectLayout from "@/components/application/project/project-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Découvrir des projets",
}

export default async function ProjectShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <ProjectLayout projectId={id} />
    );
}