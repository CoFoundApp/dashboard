import { gql } from "@apollo/client";

export type GetDashboardResult = {
    myProfile: { 
        display_name: string;
    };
    listMyProjects: Array<{
        id: string;
    }>;
    conversationsQuery: Array<{
        id: string;
    }>;
    myApplications: {
        items: Array<{
            id: string;
        }>;
    };
};

export const GET_DASHBOARD = gql`
    query GetDashboard {
        myProfile {
            display_name
        }
        listMyProjects {
            id
        }
        conversationsQuery {
            id
        }
        myApplications {
            items {
                id
            }
        }
    }
`;
