import MyProjectsEditLayout from "@/components/application/my-projects/edit/my-projects-edit-layout";

export default async function MyProjectsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <MyProjectsEditLayout projectId={id} />
    );
}