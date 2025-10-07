import { gql } from "@apollo/client";

export type ProjectStatus = "ACTIVE" | "DRAFT" | "ARCHIVED" | "PAUSED" | "SEEKING";
export type ProjectStage = "IDEA" | "MVP" | "SCALE" | "TRACTION";
export type ProjectVisibility = "PRIVATE" | "PUBLIC" | "UNLISTED";
export type MemberRole = "MAINTAINER" | "MEMBER" | "MENTOR" | "OWNER";
export type PositionStatus = "CLOSED" | "OPEN";

export type GetMyProjectsResult = {
    listMyProjects: {
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
    }[];
};

export const GET_MY_PROJECTS = gql`
    query GetMyProjects {
        listMyProjects {
            id
            title
            summary
            industry
            status
            stage
            visibility
            tags
            created_at
            updated_at
        }
    }
`;

export type GetProjectByIdResult = {
    projectById: {
        id: string;
        title: string;
        summary: string;
        description: string | null;
        avatar_url: string | null;
        banner_url: string | null;
        industry: string | null;
        owner_id: string;
        project_interests: string[];
        project_skills: string[];
        stage: ProjectStage;
        status: ProjectStatus;
        tags: string[];
        visibility: ProjectVisibility;
    } | null;
};

export const GET_PROJECT_BY_ID = gql`
    query GetProjectById($id: String!) {
        projectById(id: $id) {
            avatar_url
            banner_url
            description
            id
            industry
            owner_id
            project_interests
            project_skills
            stage
            status
            summary
            tags
            title
            visibility
        }
    }
`;

export type GetProjectMembersResult = {
    projectMembers: {
        role: MemberRole;
        users: {
            id: string;
            email: string;
            profile: {
                avatar_url: string | null;
                display_name: string;
                headline: string;
            }
        }
    }[] | null;
}

export const GET_PROJECT_MEMBERS = gql`
    query GetProjectMembers($project_id: String!) {
        projectMembers(project_id: $project_id) {
            role
            users {
                id
                email
                profile {
                    avatar_url
                    display_name
                    headline
                }
            }
        }
    }
`;

export type GetProjectPositionsResult = {
    listProjectPositions: {
        id: string;
        title: string;
        status: PositionStatus;
        description: string | null;
    }[] | null;
};

export const GET_PROJECT_POSITIONS = gql`
    query GetProjectPositions($project_id: String!) {
        listProjectPositions(project_id: $project_id) {
            id
            title
            status
            description
        }
    }
`;

export const CREATE_PROJECT_POSITION = gql`
    mutation CreateProjectPosition($input: CreateProjectPositionInput!) {
        createProjectPosition(input: $input) {
            __typename
        }
    }
`;

export const CLOSE_PROJECT_POSITION = gql`
    mutation CloseProjectPosition($id: String!) {
        closeProjectPosition(id: $id) {
            __typename
        }
    }
`;