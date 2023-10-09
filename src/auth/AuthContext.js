import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useAuthStore from './authStore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authStore = useAuthStore();
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
