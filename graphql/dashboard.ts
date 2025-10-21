import { gql } from "@apollo/client";

export type GetDashboardResult = {
    myProfile: { 
        display_name: string;
        user_id: string;
    };
};

export const GET_DASHBOARD = gql`
    query GetDashboard {
        myProfile {
            display_name
            user_id
        }
    }
`;
