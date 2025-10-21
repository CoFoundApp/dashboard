import { gql } from "@apollo/client"

export const GET_PROFILEs_MATCHES = gql`
    query BidirectionalMatches($input: MatchProfilesInput!) {
        getBidirectionalProfileMatches(input: $input) {
            items {
                profile {
                    id
                    display_name
                    headline
                    user_id
                }
                score
                competitive {
                    uniqueAdvantages
                }
                contactPlan {
                    title
                    description
                }
            }
        }
    }
`

export type GetProfilesMatchesResult = {
    getBidirectionalProfileMatches: {
        items: Array<{
            profile: {
                id: string;
                display_name: string;
                headline: string;
                user_id: string;
            };
            score: number;
            competitive: {
                uniqueAdvantages: string[];
            };
            contactPlan: Array<{
                title: string;
                description: string;
            }>
        }>;
    };
}

export const SUGGEST_PROFILES_FOR_ME = gql`
    query SuggestProfilesForMe($limit: Int) {
        suggestProfilesForMe(limit: $limit) {
            profile {
                id
                display_name
                headline
                user_id
            }
            reasons
            score
        }
    }
`;

export type SuggestProfilesForMeResult = {
    suggestProfilesForMe: {
        profile: {
            id: string;
            display_name: string;
            headline: string;
            user_id: string;
        },
        reasons: string[];
        score: number;
    }[];
}
