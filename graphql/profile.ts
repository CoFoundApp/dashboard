import { gql } from "@apollo/client";

export type ProfileVisibility = "PRIVATE" | "PUBLIC" | "UNLISTED";

export type CommunicationStyle = "CASUAL" | "DIPLOMATIC" | "DIRECT" | "FORMAL";
export type CommunicationFrequency = "ASYNC" | "BIWEEKLY" | "DAILY" | "WEEKLY";
export type CollaborationMode = "ASYNCHRONOUS" | "HYBRID" | "SYNCHRONOUS";
export type Environment = "ENTERPRISE" | "SCALEUP" | "SOLO" | "STARTUP";
export type TeamRole = "CONTRIBUTOR" | "LEADER" | "LEARNER" | "MENTOR";
export type TeamSize = "FLEXIBLE" | "LARGE" | "MEDIUM" | "SMALL";
export type WorkStyle = "AGILE" | "AUTONOMOUS" | "COLLABORATIVE" | "STRUCTURED";
export type CoreValue = "GROWTH" | "INNOVATION" | "SOCIAL_IMPACT" | "STABILITY";

export type Education = {
    degree: string | null;
    description: string | null;
    end_date: string | null;
    field_of_study: string | null;
    grade: string | null;
    is_current: boolean;
    school: string;
    start_date: string;
};

export type WorkExperience = {
    company: string;
    description: string | null;
    end_date: string | null;
    is_current: boolean;
    location: string | null;
    start_date: string;
    title: string;
};

type NamedItem = { name: string };

export type GetMyProfileResult = {
    myProfile: {
        user_id: string;
        display_name: string;
        headline: string;
        bio: string | null;
        avatar_url: string | null;
        location: string | null;
        visibility: ProfileVisibility;

        educations: Education[];
        workExperiences: WorkExperience[];

        skills: NamedItem[];
        interests: NamedItem[];
        tags: string[];
        languages: string[];

        core_values: CoreValue[] | null;
        primary_motivations: string[] | null;
        desired_team_role: TeamRole | null;

        preferred_collaboration_mode: CollaborationMode | null;
        preferred_environments: Environment[] | null;
        preferred_team_size: TeamSize | null;
        preferred_work_styles: WorkStyle[] | null;
        communication_style: CommunicationStyle | null;
        communication_frequency: CommunicationFrequency | null;

        availability_hours: number | null;
        mission_duration_min_weeks: number | null;
        mission_duration_max_weeks: number | null;
        remote_preference_percent: number | null;
        timezone: string | null;
        timezone_flexibility_minutes: number | null;

        looking_for: string | null;
    } | null;
};

export const GET_MY_PROFILE = gql`
    query GetMyProfile {
        myProfile {
            user_id
            display_name
            headline
            bio
            avatar_url
            location
            visibility

            educations {
                degree
                description
                end_date
                field_of_study
                grade
                is_current
                school
                start_date
            }
            workExperiences {
                company
                description
                end_date
                is_current
                location
                start_date
                title
            }

            skills { name }
            interests { name }
            tags
            languages

            core_values
            primary_motivations
            desired_team_role

            preferred_collaboration_mode
            preferred_environments
            preferred_team_size
            preferred_work_styles
            communication_style
            communication_frequency

            availability_hours
            mission_duration_min_weeks
            mission_duration_max_weeks
            remote_preference_percent
            timezone
            timezone_flexibility_minutes

            looking_for
        }
    }
`;

export type GetProfileByIdResult = {
    profileById: {
        user_id: string;
        display_name: string;
        headline: string;
        bio: string | null;
        avatar_url: string | null;
        location: string | null;
        visibility: ProfileVisibility;

        educations: Education[];
        workExperiences: WorkExperience[];

        skills: NamedItem[];
        interests: NamedItem[];
        tags: string[];
        languages: string[];

        core_values: CoreValue[] | null;
        primary_motivations: string[] | null;
        desired_team_role: TeamRole | null;

        preferred_collaboration_mode: CollaborationMode | null;
        preferred_environments: Environment[] | null;
        preferred_team_size: TeamSize | null;
        preferred_work_styles: WorkStyle[] | null;
        communication_style: CommunicationStyle | null;
        communication_frequency: CommunicationFrequency | null;

        availability_hours: number | null;
        mission_duration_min_weeks: number | null;
        mission_duration_max_weeks: number | null;
        remote_preference_percent: number | null;
        timezone: string | null;
        timezone_flexibility_minutes: number | null;

        looking_for: string | null;
    } | null;
};

export const GET_PROFILE_BY_ID = gql`
    query GetProfileById($id: String!) {
        profileById(id: $id) {
            user_id
            display_name
            headline
            bio
            avatar_url
            location
            visibility

            educations {
                degree
                description
                end_date
                field_of_study
                grade
                is_current
                school
                start_date
            }
            workExperiences {
                company
                description
                end_date
                is_current
                location
                start_date
                title
            }

            skills { name }
            interests { name }
            tags
            languages

            core_values
            primary_motivations
            desired_team_role

            preferred_collaboration_mode
            preferred_environments
            preferred_team_size
            preferred_work_styles
            communication_style
            communication_frequency

            availability_hours
            mission_duration_min_weeks
            mission_duration_max_weeks
            remote_preference_percent
            timezone
            timezone_flexibility_minutes

            looking_for
        }
    }
`;

export const UPDATE_MY_PROFILE = gql`
    mutation UpdateMyProfile($input: UpdateMyProfileInput!) {
        updateMyProfile(input: $input) {
            __typename
        }
    }
`;

export type SearchProfilesResult = {
    searchProfiles: {
        items: {
            id: string;
            display_name: string;
            headline: string;
            avatar_url: string | null;
            location: string | null;
            availability_hours: number | null;
            skills: NamedItem[];
            interests: NamedItem[];
            languages: string[];
        }[]
        nextCursor: string;
    }
}

export const SEARCH_PROFILES = gql`
    query SearchProfiles($q: String, $cursor: String, $filter: ProfileSearchFilterInput) {
        searchProfiles(q: $q, cursor: $cursor, filter: $filter) {
            items {
                id
                display_name
                headline
                avatar_url
                location
                availability_hours
                skills { name }
                interests { name }
                languages
            }
            nextCursor
        }
    }
`;