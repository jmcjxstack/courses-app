import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
	const isAuthenticated = localStorage.getItem('isAuth') !== null;

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}
