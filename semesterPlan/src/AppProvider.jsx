import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    console.log("APP PROVIDER",token);

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {
        token,
        setToken,
        user,
        setUser,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
};