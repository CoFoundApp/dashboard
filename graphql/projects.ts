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
    }[];
};

export const GET_MY_PROJECTS = gql`
    query GetMyProjects {
        listMyProjects {
            id
            title
            avatar_url
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
    myProfile: {
        user_id: string;
    };
    projectById: {
        id: string;
        title: string;
        summary: string;
        description: string | null;
        avatar_url: string | null;
        banner_url: string | null;
        industry: string | null;
        owner_id: string;
        tags: string[];
        project_interests: string[];
        project_skills: string[];
        stage: ProjectStage;
        status: ProjectStatus;
        visibility: ProjectVisibility;
        culture_values: string[] | null;
        culture_work_styles: string[] | null;
        management_style: "COACHING" | "HANDS_OFF" | "HANDS_ON" | "SELF_MANAGED" | null;
        communication_style: "CASUAL" | "DIPLOMATIC" | "DIRECT" | "FORMAL" | null;
        communication_frequency: "ASYNC" | "BIWEEKLY" | "DAILY" | "WEEKLY" | null;
        collaboration_mode: "ASYNCHRONOUS" | "HYBRID" | "SYNCHRONOUS" | null;
        environment: "ENTERPRISE" | "SCALEUP" | "SOLO" | "STARTUP" | null;
        preferred_team_role: "CONTRIBUTOR" | "LEADER" | "LEARNER" | "MENTOR" | null;
        preferred_team_size: "FLEXIBLE" | "LARGE" | "MEDIUM" | "SMALL" | null;
        required_hours_min: number | null;
        required_hours_max: number | null;
        duration_weeks_min: number | null;
        duration_weeks_max: number | null;
        urgency: "CRITICAL" | "HIGH" | "LOW" | "MEDIUM" | null;
        timezone: string | null;
        remote_ratio_min: number | null;
        remote_ratio_max: number | null;
    } | null;
};


export const GET_PROJECT_BY_ID = gql`
    query GetProjectById($id: String!) {
        myProfile {
            user_id
        }
        projectById(id: $id) {
            id
            title
            summary
            description
            avatar_url
            banner_url
            industry
            owner_id
            tags
            project_interests
            project_skills
            stage
            status
            visibility
            culture_values
            culture_work_styles
            management_style
            communication_style
            communication_frequency
            collaboration_mode
            environment
            preferred_team_role
            preferred_team_size
            required_hours_min
            required_hours_max
            duration_weeks_min
            duration_weeks_max
            urgency
            timezone
            remote_ratio_min
            remote_ratio_max
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
                id: string;
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
                    id
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

export type ListProjectsResult = {
    listProjects: {
        items: {
            id: string
            title: string
            summary: string | null
            description: string | null
            avatar_url: string | null
            banner_url: string | null
            industry: string | null
            owner_id: string
            project_interests: string[]
            project_skills: string[]
            stage: ProjectStage
            status: ProjectStatus
            tags: string[]
            visibility: ProjectVisibility
            created_at: Date
            updated_at: Date
        }[]
        page: number
        pageSize: number
        total: number
    }
}

export const LIST_PROJECTS = gql`
    query ListProjects(
        $filters: ProjectListFiltersInput
        $page: ProjectListPageInput
        $sort: ProjectListSortInput
    ) {
        listProjects(filters: $filters, page: $page, sort: $sort) {
            items {
                id
                title
                summary
                description
                avatar_url
                banner_url
                industry
                owner_id
                project_interests
                project_skills
                stage
                status
                tags
                visibility
                created_at
                updated_at
            }
            page
            pageSize
            total
        }
    }
`;

export type SearchProjectsResult = {
    searchProjects: {
        project: {
            id: string
            title: string
            summary: string | null
            description: string | null
            avatar_url: string | null
            banner_url: string | null
            industry: string | null
            owner_id: string
            project_interests: string[]
            project_skills: string[]
            stage: ProjectStage
            status: ProjectStatus
            tags: string[]
            visibility: ProjectVisibility
            created_at: Date
            updated_at: Date
        }
        reasons: string[]
        score: number
    }[]
}

export const SEARCH_PROJECTS = gql`
    query SearchProjects($q: String!, $k: Int, $embedding: [Float!]) {
        searchProjects(q: $q, k: $k, embedding: $embedding) {
            project {
                id
                title
                summary
                description
                avatar_url
                banner_url
                industry
                owner_id
                project_interests
                project_skills
                stage
                status
                tags
                visibility
                created_at
                updated_at
            }
            reasons
            score
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            __typename
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation DeleteProject($id: String!) {
        deleteProject(id: $id)
    }
`;

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: String!, $input: UpdateProjectInput!) {
        updateProject(id: $id, input: $input) {
            __typename
        }
    }
`;

export const LEAVE_PROJECT = gql`
    mutation LeaveProject($project_id: String!) {
        leaveProject(project_id: $project_id)
    }
`;

export const REMOVE_PROJECT_MEMBER = gql`
    mutation RemoveProjectMember($project_id: String!, $user_id: String!) {
        removeProjectMember(project_id: $project_id, user_id: $user_id)
    }
`;