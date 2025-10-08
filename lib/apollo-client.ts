import { ApolloClient, InMemoryCache } from "@apollo/client"
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs"

const uploadLink = new UploadHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: "include",
    headers: {
        "Apollo-Require-Preflight": "true",
    }
});

const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
});

export default client