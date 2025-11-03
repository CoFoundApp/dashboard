"use client";

import { GET_PROJECT_BY_ID, GetProjectByIdResult } from "@/graphql/projects";
import { useQuery } from "@apollo/client/react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ProjectHeader from "../../project/project-header";
import ProjectSkills from "../../project/project-skills";
import ProjectInterests from "../../project/project-interests";
import ProjectTags from "../../project/project-tags";
import ProjectDescription from "../../project/project-description";
import ProjectMembers from "../../project/project-members";
import MyProjectsShowPositions from "./my-projects-show-positions";
import MyProjectsShowApplies from "./my-projects-show-applies";
import MyProjectsShowProfiles from "./my-projects-show-profiles";
import ProjectEnterpriseValues from "../../project/project-enterprise-values";
import ProjectWorkStyles from "../../project/project-work-styles";
import ProjectCommitment from "../../project/project-commitment";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MyProjectsShowLayoutProps {
    projectId: string;
}

export default function MyProjectsShowLayout({ projectId }: MyProjectsShowLayoutProps) {
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

    const isOwner = data.myProfile.user_id === data.projectById.owner_id;

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
                isLeavable={!isOwner}
                isEditable={isOwner}
                isRemovable={isOwner}
            />
            <ProjectDescription description={data.projectById.description} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectSkills skills={data.projectById.project_skills} />
                <ProjectInterests interests={data.projectById.project_interests} />
                <ProjectTags tags={data.projectById.tags} />
            </div>

            <div className="flex justify-center">
                <Button variant="outline" onClick={() => setShowMore(!showMore)} className="gap-2">
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
                </div>
            )}

            <ProjectMembers projectId={projectId} userId={data.myProfile.user_id} isOwner />
            <MyProjectsShowPositions projectId={projectId} />
            <MyProjectsShowApplies projectId={projectId} />
            <MyProjectsShowProfiles projectId={projectId} />
        </section>
    );
}