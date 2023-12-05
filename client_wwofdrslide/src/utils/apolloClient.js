import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';


const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT

const httpLink = createHttpLink({
    uri: graphqlEndpoint,
    credentials: 'include'
});

// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('id_token');

//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : '',
//         },
//     };
// });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;