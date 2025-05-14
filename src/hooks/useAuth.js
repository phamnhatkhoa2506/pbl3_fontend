import { useState } from "react";

import { login, logout } from "../api/authenticateAPI/authenticate.js";


export default function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLogin = async (username, password) => {
        try {
            const response = await login({ 
                    "username": username, 
                    "password": password
            });

            if (response.status === 200) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    
    const handleLogout = () => {
        logout({ 
            "username": username, 
            "password": password
        });
        setUser(null);
        setIsAuthenticated(false);
    };
    
    return { user, isAuthenticated, handleLogin, handleLogout };
}