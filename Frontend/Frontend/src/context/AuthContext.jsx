import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await api.users.getProfile();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await api.users.login({ email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    }
    return { success: false, error: response.message || 'Login failed' };
  };

  const register = async (name, email, password) => {
    const response = await api.users.register({ name, email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return { success: true };
    }
    return { success: false, error: response.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
