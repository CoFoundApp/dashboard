import ProfileLayout from "@/components/application/profile/profile-layout"

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <ProfileLayout profileId={id} />
    );
}