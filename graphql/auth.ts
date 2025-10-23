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

export type VerifyEmailResult = {
    verifyEmail: boolean;
}

export const VERIFY_EMAIL = gql`
    mutation verifyEmail($token: String!) {
        verifyEmail(token: $token)
    }
`;