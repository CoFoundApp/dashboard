import ProjectLayout from "@/components/application/project/project-layout";

export default async function ProjectShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <ProjectLayout projectId={id} />
    );
}