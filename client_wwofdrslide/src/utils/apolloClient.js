import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT

const httpLink = createHttpLink({
    uri: graphqlEndpoint,
    credentials: 'include'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;