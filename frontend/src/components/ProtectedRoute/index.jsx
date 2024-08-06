// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  const localStorageToken = localStorage.getItem('token');
  return localStorageToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
