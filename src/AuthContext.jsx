import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: JSON.parse(storedUser),
      });
    }
  }, [dispatch]);

  const login = (userData) => {
    dispatch({
      type: 'SIGNIN_SUCCESS',
      payload: userData,
    });
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('loggedInUser');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
