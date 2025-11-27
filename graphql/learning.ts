import { gql } from "@apollo/client";

export type CourseLevel = "ADVANCED" | "BEGINNER" | "INTERMEDIATE";

export type GetCoursesResult = {
    courses: {
        items: Array<{
            id: string;
            title: string;
            subtitle: string;
            category: string;
            estimatedMinutes: number;
            level: CourseLevel;
            sections: Array<{
                id: string;
            }>;
            slug: string;
        }>;
    }
}

export const GET_COURSES = gql`
    query GetCourses(
        $filters: CourseFilterInput
    ) {
        courses(filter: $filters) {
            items {
                id
                title
                subtitle
                category
                level
                estimatedMinutes
                sections {
                    id
                }
                slug
            }
        }    
    }
`;

export type GetCourseBySlugResult = {
    course: {
        category: string;
        description: string;
        level: CourseLevel;
        sections: Array<{
            id: string;
            lessons: Array<{
                estimatedMinutes: number;
                slug: string;
                title: string;
            }>;
            position: number;
            title: string;
        }>;
        subtitle: string;
        title: string;
    }
}

export const GET_COURSE_BY_SLUG = gql`
    query GetCourseBySlug(
        $slug: String!
    ) {
        course(slug: $slug) {
            category
            description
            level
            sections {
                id
                lessons {
                    estimatedMinutes
                    slug
                    title
                }
                position
                title
            }
            subtitle
            title
        }    
    }
`;

export type GetCourseLessonsResult = {
    course: {
        sections: Array<{
            lessons: Array<{
                slug: string;
                summary: string;
                title: string;
            }>;
            title: string;
        }>;
    };
}

export const GET_COURSE_LESSONS = gql`
    query GetCourseLessons(
        $slug: String!
    ) {
        course(slug: $slug) {
            sections {
                lessons {
                    slug
                    summary   
                    title
                }
                title
            }
        }    
    }
`;