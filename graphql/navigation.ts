import { gql } from "@apollo/client";

export type GetNavigationResult = {
    myEmail: string;
    myProfile: { display_name: string; }
}

export const GET_NAVIGATION = gql`
    query GetNavigation {
        myEmail
        myProfile {
            display_name
        }
    }
`;