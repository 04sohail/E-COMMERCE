import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Landing_Page from '../pages/Landing_Page';
import { PublicRoute } from './Protected_routes.tsx';
import { routesConfig } from './Route_Config';
import Invalid_Route from '../pages/Invalid_Route.tsx';
import Signup from '../pages/Sign_Up.tsx';
import Product_details from '../pages/Product_details.tsx';
import ShoppingCart from '../pages/ShoppingCart.tsx';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path={routesConfig.login} element={<PublicRoute><Login /></PublicRoute>} />
                <Route path={routesConfig.signup} element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path={routesConfig.cart} element={<PublicRoute><ShoppingCart /></PublicRoute>} />
                {/* Protected Routes */}
                <Route path={routesConfig.landing} element={<Landing_Page />} />
                <Route path={routesConfig.product_details} element={<Product_details />} />
                {/* Route For Invalid URL's */}
                <Route path={routesConfig.random} element={<Invalid_Route />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
