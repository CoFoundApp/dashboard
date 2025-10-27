import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            __typename
        }
    }
`;

export const REGISTER = gql`
    mutation Signup($input: SignupInput!) {
        signup(input: $input) {
            __typename
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export type VerifyEmailResult = {
    verifyEmail: boolean;
}

export const VERIFY_EMAIL = gql`
    mutation verifyEmail($token: String!) {
        verifyEmail(token: $token)
    }
`;

export type StartOAuthResult = {
    startOAuth: {
        url: string;
    }
};

export const START_OAUTH = gql`
    mutation StartOAuth($provider: OAuthProvider!, $redirectUri: String!) {
        startOAuth(provider: $provider, redirectUri: $redirectUri) {
            url
        }
    }
`;

export type CompleteOAuthResult = {
    completeOAuth: {
        __typename: string;
    }
}

export const COMPLETE_OAUTH = gql`
    mutation CompleteOAuth($input: CompleteOAuthInput!) {
        completeOAuth(input: $input) {
            __typename
        }
    }
`;

export type RequestPasswordResetResult = {
    requestPasswordReset: boolean;
}

export const REQUEST_PASSWORD_RESET = gql`
    mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
        requestPasswordReset(input: $input)
    }
`;