import { gql } from "@apollo/client"

export const GET_PROFILEs_MATCHES = gql`
    query BidirectionalMatches($input: MatchProfilesInput!) {
        getBidirectionalProfileMatches(input: $input) {
            items {
                profile {
                    id
                    display_name
                    headline
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
