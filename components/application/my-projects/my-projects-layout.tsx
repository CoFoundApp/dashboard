"use client";

import { Loader2 } from "lucide-react";
import MyProjectsHeader from "./my-projects-header";
import { useQuery } from "@apollo/client/react";
import { GET_MY_PROJECTS, GetMyProjectsResult } from "@/graphql/projects";
import MyProjectsList from "./my-projects-list";

export default function MyProjectsLayout() {
    const { data, loading, error } = useQuery<GetMyProjectsResult>(GET_MY_PROJECTS, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de vos projets" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.listMyProjects) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de vos projets.
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
            <MyProjectsHeader />
            <MyProjectsList projects={data.listMyProjects} />
        </section>
    );
}