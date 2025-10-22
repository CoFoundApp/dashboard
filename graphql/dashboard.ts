import { gql } from "@apollo/client";

export type GetDashboardResult = {
    myProfile: { 
        id: string;
        display_name: string;
        user_id: string;
    };
};

export const GET_DASHBOARD = gql`
    query GetDashboard {
        myProfile {
            id
            display_name
            user_id
        }
    }
`;
