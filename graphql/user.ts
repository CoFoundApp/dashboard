import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        myProfile {
            id
            user_id
            display_name
            avatar_url
        }
    }
`;

export interface CurrentUser {
  myProfile: {
    id: string
    user_id: string
    display_name: string | null
    avatar_url: string | null
  }
}

export interface GetCurrentUserResult {
  myProfile: CurrentUser["myProfile"]
}