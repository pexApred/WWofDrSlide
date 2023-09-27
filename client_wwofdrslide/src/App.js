import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './utils/Context';
import './App.css';

import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RiddlePage from './pages/RiddlePage/RiddlePage';
import RiddleRankingsPage from './pages/RiddleRankingsPage/RiddleRankingsPage';
import Footer from './components/Footer/Footer';

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <div className="App">
          <Router>
              <Routes>
                <Route
                  path="/"
                  element={<HomePage />}
                />
                <Route
                  path='/profile'
                  element={<ProfilePage />}
                />
                <Route
                  path='/riddles'
                  element={<RiddlePage />}
                />
                <Route
                  path='/riddles/:id'
                  element={<RiddlePage />}
                />
                {/* <Route
                  path='/ratings'
                  element={<RiddleRankingsPage />}
                /> */}
                <Route 
                path="*" 
                element={<h1 className='display-2'>Wrong page!</h1>} 
                />
              </Routes>
              <Footer />
          </Router>
        </div>
      </ContextProvider>
    </ApolloProvider>
  );
}

export default App;
