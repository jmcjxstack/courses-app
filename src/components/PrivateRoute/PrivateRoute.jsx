import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { getUserRole } from '../../store/user/userSelectors';

export default function PrivateRoute({ allowedRoles }) {
	const isAuthenticated = !!localStorage.getItem('isAuth');
	const role = useSelector(getUserRole);

	if (isAuthenticated && allowedRoles && allowedRoles.includes(role)) {
		return <Outlet />;
	}

	if (isAuthenticated && allowedRoles && !allowedRoles.includes(role)) {
		return <Navigate to='/courses' />;
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
}
