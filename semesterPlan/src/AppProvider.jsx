import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    console.log("APP PROVIDER",token);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token',token);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const getUserInfo = async (token) => {
        try {
          const response = await fetch('http://localhost:5000/user/userinfo', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }), // Send google access token
          });
    
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const userInfo = await response.json();
          
          if (userInfo) {
            setUser(userInfo);
          }
    
          console.log("User Information:", userInfo);
      } catch (error) {
          console.error("Error fetching user info:", error);
      }
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