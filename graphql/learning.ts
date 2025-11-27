import { gql } from "@apollo/client";

export type CourseLevel = "ADVANCED" | "BEGINNER" | "INTERMEDIATE";

export type GetCoursesResult = {
    courses: {
        items: Array<{
            id: string;
            title: string;
            description: string;
            category: string;
            level: CourseLevel;
            sections: Array<{
                id: string;
                lessons: Array<{
                    estimatedMinutes: number;
                }>;
            }>;
            slug: string;
        }>;
    }
}

export const GET_COURSES = gql`
    query GetCourses(
        $filter: CourseFilterInput
    ) {
        courses(filter: $filter) {
            items {
                id
                title
                description
                category
                level
                sections {
                    id
                    lessons {
                        estimatedMinutes
                    }
                }
                slug
            }
        }    
    }
`;