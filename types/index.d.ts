import { ProjectStage, ProjectStatus, ProjectVisibility } from "@/graphql/projects"

interface IProject {
    id: string;
    title: string;
    avatar_url?: string;
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

interface IProjectApplication {
    id: string;
    applicant_id: string;
    position_id: string;
    project_id: string;
    note: string;
    attachment_urls: string[];
    status: ApplicationStatus;
    created_at: Date;
    updated_at: Date;
    decided_at?: Date;
    decided_by?: string;
    position?: {
        id: string;
        title: string;
        description: string;
        status: PositionStatus;
    }
    project?: {
        id: string;
        title: string;
        summary?: string;
        avatar_url?: string;
        industry?: string;
    }
}