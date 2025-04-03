import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/user/useUser';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useUser();
    if (user.email && user.email.length > 0) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useUser();
    if (user.email && user.email.length > 0) {
        return children;
    } else {
        return children;
    }
}
