"use client";

import { useQuery } from "@apollo/client/react";
import ProfileHeader from "./profile-header";
import { GET_MY_PROFILE, GetMyProfileResult } from "@/graphql/profile";
import { Loader2 } from "lucide-react";
import ProfileAbout from "./profile-about";
import ProfileWorkExperiences from "./profile-work-experiences";
import ProfileEducations from "./profile-educations";
import ProfileSkills from "./profile-skills";
import ProfileInterests from "./profile-interests";
import ProfileTags from "./profile-tags";

export default function MyProfileLayout() {
    const { data, loading, error } = useQuery<GetMyProfileResult>(GET_MY_PROFILE, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de votre profil" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.myProfile) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de votre profil.
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
                display_name={data.myProfile.display_name}
                headline={data.myProfile.headline}
                avatar_url={data.myProfile.avatar_url}
                user_id={data.myProfile.user_id}
                isEditable
            />
            <ProfileAbout description={data.myProfile.bio} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProfileSkills skills={data.myProfile.skills} />
                <ProfileInterests interests={data.myProfile.interests} />
                <ProfileTags tags={data.myProfile.tags} />
            </div>
            <ProfileWorkExperiences workExperiences={data.myProfile.workExperiences} />
            <ProfileEducations educations={data.myProfile.educations} /> 
        </section>
    );
}