import React, { useState, useEffect } from 'react';
import AuthService from './auth.js';

const Context = React.createContext({
    loggedIn: false,
    setLoggedIn: () => {},
});

export const ContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = AuthService.loggedIn();
            setLoggedIn(checkLoggedIn);
    }, []);

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </Context.Provider>
    );
};

export default Context;