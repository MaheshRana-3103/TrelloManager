// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../../store';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated,setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const token = localStorage.getItem('token');
  if(token == null){setIsAuthenticated(false);}
  else{setIsAuthenticated(true);}
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
