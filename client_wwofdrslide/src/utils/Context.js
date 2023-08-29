import React, { useState } from 'react';

const Context = React.createContext({
    loggedIn: false,
    setLoggedIn: () => {}
});

export const ContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </Context.Provider>
    );
};

export default Context;