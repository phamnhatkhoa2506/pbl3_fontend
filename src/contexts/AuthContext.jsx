import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsLoading(false); 
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
