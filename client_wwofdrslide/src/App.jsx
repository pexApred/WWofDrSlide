import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './utils/Context';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RiddlePage from './pages/RiddlePage/RiddlePage';
import StatsPage from './pages/StatsPage/StatsPage';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <div className="App">
          <Router>
            <NavBar/>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
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
              <Route
                path='/statistics'
                element={<StatsPage />}
              />
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
