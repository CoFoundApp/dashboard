"use client";

import { GET_PROJECT_BY_ID, GetProjectByIdResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ProjectHeader from "./project-header";
import ProjectDescription from "./project-description";
import ProjectSkills from "./project-skills";
import ProjectInterests from "./project-interests";
import ProjectTags from "./project-tags";
import ProjectMembers from "./project-members";
import ProjectPositions from "./project-positions";
import { useState } from "react";
import ProjectCollaboration from "./project-collaboration";
import ProjectCommitment from "./project-commitment";
import ProjectWorkStyles from "./project-work-styles";
import ProjectEnterpriseValues from "./project-enterprise-values";
import { Button } from "@/components/ui/button";

interface ProjectLayoutProps {
    projectId: string;
}

export default function ProjectLayout({ projectId }: ProjectLayoutProps) {
    const [showMore, setShowMore] = useState(false);

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
                projectId={projectId}
                title={data.projectById.title}
                summary={data.projectById.summary}
                avatar_url={data.projectById.avatar_url}
                industry={data.projectById.industry}
                stage={data.projectById.stage}
                status={data.projectById.status}
                isCandidate
            />
            <ProjectDescription description={data.projectById.description} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectSkills skills={data.projectById.project_skills} />
                <ProjectInterests interests={data.projectById.project_interests} />
                <ProjectTags tags={data.projectById.tags} />
            </div>

            {showMore && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectEnterpriseValues values={data.projectById.culture_values} />
                    <ProjectWorkStyles styles={data.projectById.culture_work_styles} />
                    <ProjectCommitment
                        required_hours_min={data.projectById.required_hours_min}
                        required_hours_max={data.projectById.required_hours_max}
                        duration_weeks_min={data.projectById.duration_weeks_min}
                        duration_weeks_max={data.projectById.duration_weeks_max}
                        remote_ratio_min={data.projectById.remote_ratio_min}
                        remote_ratio_max={data.projectById.remote_ratio_max}
                    />
                    <ProjectCollaboration
                        management_style={data.projectById.management_style}
                        communication_style={data.projectById.communication_style}
                        communication_frequency={data.projectById.communication_frequency}
                        collaboration_mode={data.projectById.collaboration_mode}
                        environment={data.projectById.environment}
                    />
                </div>
            )}

            <div className="flex justify-center">
                <Button variant="ghost" onClick={() => setShowMore(!showMore)} className="gap-2">
                    {showMore ? (
                        <>
                            Voir moins
                            <ChevronUp className="size-4" />
                        </>
                    ) : (
                        <>
                            Voir plus
                            <ChevronDown className="size-4" />
                        </>
                    )}
                </Button>
            </div>

            <ProjectMembers projectId={projectId} />
            <ProjectPositions projectId={projectId} />
        </section>
    );
}