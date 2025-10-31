import { gql } from "@apollo/client";

export type ProfileVisibility = "PRIVATE" | "PUBLIC" | "UNLISTED";

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

export type GetMyProfileResult = {
    myProfile: {
        avatar_url: string | null;
        availability_hours: number | null;
        bio: string | null;
        display_name: string;
        educations: Array<{
            degree: string | null;
            description: string | null;
            end_date: string | null;
            field_of_study: string | null;
            grade: string | null;
            is_current: boolean;
            school: string;
            start_date: string;
        }>;
        headline: string;
        interests: Array<{
            name: string;
        }>;
        languages: string[];
        location: string | null;
        looking_for: string | null;
        skills: Array<{
            name: string;
        }>;
        tags: string[];
        user_id: string;
        visibility: ProfileVisibility;
        website_url: string | null;
        workExperiences: Array<{
            company: string;
            description: string | null;
            end_date: string | null;
            is_current: boolean;
            location: string | null;
            start_date: string;
            title: string;
        }>;
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
        avatar_url: string | null;
        availability_hours: number | null;
        bio: string | null;
        display_name: string;
        educations: Array<{
            degree: string | null;
            description: string | null;
            end_date: string | null;
            field_of_study: string | null;
            grade: string | null;
            is_current: boolean;
            school: string;
            start_date: string;
        }>;
        headline: string;
        interests: Array<{
            name: string;
        }>;
        languages: string[];
        location: string | null;
        looking_for: string | null;
        skills: Array<{
            name: string;
        }>;
        tags: string[];
        user_id: string;
        visibility: ProfileVisibility;
        website_url: string | null;
        workExperiences: Array<{
            company: string;
            description: string | null;
            end_date: string | null;
            is_current: boolean;
            location: string | null;
            start_date: string;
            title: string;
        }>;
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