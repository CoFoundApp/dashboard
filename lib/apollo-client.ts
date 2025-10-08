import { ApolloClient, from, InMemoryCache } from "@apollo/client"
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";

const uploadLink = new UploadHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: "include",
    headers: {
        "Apollo-Require-Preflight": "true",
    }
});

const removeTypenameLink = new RemoveTypenameFromVariablesLink();

const client = new ApolloClient({
    link: from([removeTypenameLink, uploadLink]),
    cache: new InMemoryCache(),
});

export default client