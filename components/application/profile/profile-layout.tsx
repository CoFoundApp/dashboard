"use client";

import { useQuery } from "@apollo/client/react";
import ProfileHeader from "./profile-header";
import { GET_PROFILE_BY_ID, GetProfileByIdResult } from "@/graphql/profile";
import { Loader2 } from "lucide-react";
import ProfileAbout from "./profile-about";
import ProfileWorkExperiences from "./profile-work-experiences";
import ProfileEducations from "./profile-educations";
import ProfileSkills from "./profile-skills";
import ProfileInterests from "./profile-interests";
import ProfileTags from "./profile-tags";
import ProfileLanguages from "./profile-languages";

interface ProfileLayoutProps {
    profileId: string;
}

export default function ProfileLayout({ profileId }: ProfileLayoutProps) {
    const { data, loading, error } = useQuery<GetProfileByIdResult>(GET_PROFILE_BY_ID, {
        variables: { id: profileId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement du profil" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.profileById) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement du profil.
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="text-sm underline underline-offset-4"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-12">
            <ProfileHeader
                display_name={data.profileById.display_name}
                headline={data.profileById.headline}
                avatar_url={data.profileById.avatar_url}
                isEditable={false}
            />
            <ProfileAbout description={data.profileById.bio} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProfileSkills skills={data.profileById.skills} />
                <ProfileInterests interests={data.profileById.interests} />
                <ProfileTags tags={data.profileById.tags} />
            </div>
            <ProfileWorkExperiences workExperiences={data.profileById.workExperiences} />
            <ProfileEducations educations={data.profileById.educations} /> 
        </section>
    );
}