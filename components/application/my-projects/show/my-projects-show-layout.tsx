"use client";

import { GET_PROJECT_BY_ID, GetProjectByIdResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import ProjectHeader from "../../project/project-header";
import ProjectSkills from "../../project/project-skills";
import ProjectInterests from "../../project/project-interests";
import ProjectTags from "../../project/project-tags";
import ProjectDescription from "../../project/project-description";
import ProjectMembers from "../../project/project-members";

interface MyProjectsShowLayoutProps {
    projectId: string;
}

export default function MyProjectsShowLayout({ projectId }: MyProjectsShowLayoutProps) {
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
            <ProjectHeader
                title={data.projectById.title}
                summary={data.projectById.summary}
                avatar_url={data.projectById.avatar_url}
                isEditable
            />
            <ProjectDescription description={data.projectById.description} />
            <div className="grid md:grid-cols-2 gap-8">
                <ProjectMembers projectId={projectId} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectSkills skills={data.projectById.project_skills} />
                <ProjectInterests interests={data.projectById.project_interests} />
                <ProjectTags tags={data.projectById.tags} />
            </div>
        </section>
    );
}