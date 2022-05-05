import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes as ReactRoutes, } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import { StoreState } from '../redux';

const Routes: React.FC = () => {
    const auth = useSelector((store: StoreState) => store.auth)

    return (
        <>
            <ReactRoutes>
                <Route index element={auth.isLoggedIn ? <HomePage /> : <LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="home" element={<HomePage />} />
            </ReactRoutes>
        </>
    )
}

export default Routes;