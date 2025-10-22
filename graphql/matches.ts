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
                chemistry {
                    modelVersion
                    notes
                    score
                    successConfidence
                    successProbability
                }
                competitive {
                    confidence
                    percentile
                    rank
                    totalCandidates
                    uniqueAdvantages
                }
                confidence
                dimensionScores {
                    confidence
                    debug
                    gaps
                    key
                    score
                    strengths
                    weight
                }
                forces {
                    description
                    dimension
                    label
                }
                gaps {
                    description
                    dimension
                    impact
                    label
                }
                recommendations {
                    detailLevel
                    dimension
                    effort
                    eta
                    impact
                    label
                    priority
                }
                successConfidence
                successProbability
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
                headline?: string | null;
                user_id?: string | null;
            };
            score: number;
            chemistry: {
                modelVersion: string;
                notes: string[];
                score: number;
                successConfidence: number;
                successProbability: number;
            };
            competitive: {
                confidence: number;
                percentile?: number | null;
                rank?: number | null;
                totalCandidates?: number | null;
                uniqueAdvantages?: string[] | null;
            };
            confidence?: number | null;
            dimensionScores: Array<{
                confidence: number;
                debug?: Record<string, any>;
                gaps: string[];
                key: string;
                score: number;
                strengths: string[];
                weight: number;
            }>;
            forces: Array<{
                description: string;
                dimension: string;
                label: string;
            }>;
            gaps: Array<{
                description: string;
                dimension: string;
                impact: number;
                label?: string | null;
            }>;
            recommendations: Array<{
                detailLevel?: string | null;
                dimension: string;
                effort: number;
                eta: string;
                impact: number;
                label: string;
                priority: number;
            }>;
            successConfidence: number;
            successProbability: number;
            contactPlan: Array<{
                title: string;
                description: string;
            }>;
        }>;
    };
};

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

export const SUGGEST_PROJECTS_FOR_ME = gql`
    query SuggestProjectsForMe($input: MatchProjectsInput!) {
        getBidirectionalProjectMatches(input: $input) {
            items {
                project {
                    id
                    title
                    summary
                }
                score
                confidence
                successProbability
                dimensionScores {
                    key
                    score
                    confidence
                    strengths
                    gaps
                }
                forces {
                    dimension
                    label
                    description
                }
                gaps {
                    dimension
                    label
                    description
                    impact
                }
                recommendations {
                    dimension
                    label
                    impact
                    effort
                    eta
                    priority
                }
                chemistry {
                    score
                    successProbability
                    successConfidence
                    modelVersion
                    notes
                }
            }
        }
    }
`;

export type SuggestProjectsForMeResult = {
    getBidirectionalProjectMatches: {
        items: Array<{
            project: {
                id: string;
                title: string;
                summary: string;
            };
            score: number;
            confidence: number | null;
            successProbability: number | null;
            dimensionScores: Array<{
                key: string;
                score: number;
                confidence: number | null;
                strengths: string[] | null;
                gaps: string[] | null;
            }> | null;
            forces: Array<{
                dimension: string;
                label: string;
                description: string;
            }> | null;
            gaps: Array<{
                dimension: string;
                label: string;
                description: string;
                impact: string;
            }> | null;
            recommendations: Array<{
                dimension: string;
                label: string;
                impact: string;
                effort: string;
                eta: string;
                priority: string;
            }> | null;
            chemistry: {
                score: number;
                successProbability: number;
                successConfidence: number;
                modelVersion: string;
                notes: string | null;
            } | null;
        }>;
    };
};

