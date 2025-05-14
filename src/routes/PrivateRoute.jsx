import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner'
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
