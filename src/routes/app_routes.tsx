import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import { ProtectedRoute, PublicRoute } from './Protected_routes.tsx';
import { routesConfig } from './Route_Config';
import Invalid_Route from '../pages/Invalid_Route.tsx';
import Signup from '../pages/Sign_Up.tsx';
import Product_details from '../components/Product_details.tsx';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path={routesConfig.login} element={<PublicRoute><Login /></PublicRoute>} />
                <Route path={routesConfig.signup} element={<PublicRoute><Signup /></PublicRoute>} />
                {/* Protected Routes */}
                <Route path={routesConfig.landing} element={<ProtectedRoute><Landing_Page /></ProtectedRoute>} />
                <Route path={routesConfig.product_details} element={<ProtectedRoute><Product_details /></ProtectedRoute>} />
                {/* Route For Invalid URL's */}
                <Route path={routesConfig.random} element={<Invalid_Route />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
