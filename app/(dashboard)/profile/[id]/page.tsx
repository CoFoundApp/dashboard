import ProfileLayout from "@/components/application/profile/profile-layout"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CoFound - Liste des profils",
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <ProfileLayout profileId={id} />
    );
}