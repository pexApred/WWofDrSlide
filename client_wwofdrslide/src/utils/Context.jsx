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
  });

  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setUser(data.me);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser(null);
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
