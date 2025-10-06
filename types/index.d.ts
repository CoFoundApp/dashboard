import { ProjectStage, ProjectStatus, ProjectVisibility } from "@/graphql/projects"

interface IProject {
    id: string;
    title: string;
    summary?: string;
    description?: string;
    industry: string;
    status: ProjectStatus;
    stage: ProjectStage;
    visibility: ProjectVisibility;
    tags: string[];
    created_at: Date;
    updated_at: Date;
}