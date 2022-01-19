import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useRealmApp } from '../../realm/RealmApp'

export default function RequireAuth({ children }) {
	const app = useRealmApp();
	let location = useLocation();

	if (!app.currentUser) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children
}
