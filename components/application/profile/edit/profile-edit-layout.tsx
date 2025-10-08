"use client";

import { GET_MY_PROFILE, GetMyProfileResult } from "@/graphql/profile";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import MyProfileEditHeader from "./profile-edit-header";
import MyProfileEditForm from "./profile-edit-form";

export default function MyProfileEditLayout() {
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
            <MyProfileEditHeader />
            <MyProfileEditForm profile={data.myProfile} />
        </section>
    );
}