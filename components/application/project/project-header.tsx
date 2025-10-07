import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectStage, ProjectStatus } from "@/graphql/projects";
import { projectStageLabels, projectStatusLabels } from "@/lib/utils";
import { Edit } from "lucide-react";
import ProjectApplyDialog from "./project-apply-dialog";

interface ProjectHeaderProps {
    projectId: string;
    title: string;
    summary: string;
    avatar_url: string | null;
    industry: string | null;
    stage: ProjectStage;
    status: ProjectStatus;
    isEditable?: boolean;
    isCandidate?: boolean;
}

export default function ProjectHeader({
    projectId,
    title,
    summary,
    avatar_url,
    industry,
    stage,
    status,
    isEditable = false,
    isCandidate = false
}: ProjectHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
                <Avatar className="size-20">
                    <AvatarImage src={avatar_url ?? ""} alt={title} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {title.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {summary}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {industry && <Badge variant="secondary">{industry}</Badge>}
                        <Badge variant="outline">{projectStageLabels[stage]}</Badge>
                        <Badge variant="outline">{projectStatusLabels[status]}</Badge>
                    </div>
                </div>
            </div>
            {isEditable && (
                <Button>
                    <Edit className="size-4 mr-1" />
                    Modifier mon projet
                </Button>
            )}
            {isCandidate && (
                <ProjectApplyDialog projectId={projectId} />
            )}
        </div>
    );
}