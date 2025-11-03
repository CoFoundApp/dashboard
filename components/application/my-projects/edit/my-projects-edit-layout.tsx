"use client";

import { GET_PROJECT_BY_ID, GetProjectByIdResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import MyProjectsEditHeader from "./my-projects-edit-header";
import MyProjectsEditForm from "./my-projects-edit-form";

interface MyProjectsEditLayoutProps {
    projectId: string;
}

export default function MyProjectsEditLayout({ projectId }: MyProjectsEditLayoutProps) {
    const { data, loading, error } = useQuery<GetProjectByIdResult>(GET_PROJECT_BY_ID, {
        variables: { id: projectId },
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true,
    });

    if (loading && !data) {
        return (
            <section className="space-y-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" aria-label="Chargement de votre projet" />
                </div>
            </section>
        );
    }

    if (error || !data || !data.projectById) {
        return (
            <section className="space-y-8">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-destructive" role="alert">
                        Une erreur est survenue lors du chargement de votre projet.
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
            <MyProjectsEditHeader projectId={projectId} />
            <MyProjectsEditForm project={data.projectById} />
        </section>
    );
}