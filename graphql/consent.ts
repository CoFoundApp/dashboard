import { gql } from '@apollo/client';

export const SET_MY_CONSENT = gql`
    mutation SetMyConsent($input: SetConsentInput!) {
        setMyConsent(input: $input) {
            id
            consent_type
            granted
            granted_at
        }
    }
`;

export const GET_CURRENT_CONSENTS = gql`
    query MyCurrentConsents {
        myCurrentConsents {
            consent_type
            granted
        }
    }
`;