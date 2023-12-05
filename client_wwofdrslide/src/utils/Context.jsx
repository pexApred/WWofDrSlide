import React, { useState, useEffect, createContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "./queries";

export const AuthContext = createContext({
  user: null,
  loggedIn: false,
  setLoggedIn: () => {},
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { data, loading, error } = useQuery(QUERY_ME, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data && data.me) {
        setUser(data.me);
        setLoggedIn(true);
      }
    },
    onError: (error) => {
      console.error("Error loading user data:", error);
      console.log(error.graphQLErrors);
      console.log(error.networkError);
      setLoggedIn(false);
      setUser(null);
    },
  });

  useEffect(() => {
    console.log("Query Data:", data); 
    if (!loading) {
        if (data && data.me) {
          setUser(data.me);
          setLoggedIn(true);
        } else if (error) {
          console.error("Error fetching user data:", error);
        }
    }
  }, [data, loading, error]);

  return (
    <AuthContext.Provider value={{ user, loggedIn, setLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
