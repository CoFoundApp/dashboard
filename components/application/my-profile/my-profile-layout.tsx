"use client";

import { useQuery } from "@apollo/client/react";
import MyProfileHeader from "./my-profile-header";
import { GET_MY_PROFILE, GetMyProfileResult } from "@/graphql/profile";
import { Loader2 } from "lucide-react";
import MyProfileAbout from "./my-profile-about";
import MyProfileWorkExperiences from "./my-profile-work-experiences";
import MyProfileEducations from "./my-profile-educations";
import MyProfileSkills from "./my-profile-skills";
import MyProfileInterests from "./my-profile-interests";
import MyProfileTags from "./my-profile-tags";
import MyProfileLanguages from "./my-profile-languages";

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
            <MyProfileHeader
                display_name={data.myProfile.display_name}
                headline={data.myProfile.headline}
                avatar_url={data.myProfile.avatar_url}
            />
            <div className="space-y-8">
                <MyProfileAbout description={data.myProfile.bio} />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <MyProfileSkills skills={data.myProfile.skills} />
                        <MyProfileInterests interests={data.myProfile.interests} />
                        <MyProfileTags tags={data.myProfile.tags} />
                        <MyProfileLanguages languages={data.myProfile.languages} />
                    </div>
                    <div className="space-y-8">
                        <MyProfileWorkExperiences workExperiences={data.myProfile.workExperiences} />
                        <MyProfileEducations educations={data.myProfile.educations} />  
                    </div>
                </div>
            </div>
        </section>
    );
}