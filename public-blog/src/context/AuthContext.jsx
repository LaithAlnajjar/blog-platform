import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://blog-api-production-b6da.up.railway.app';
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const register = async (data) => {
    if (!data.username || !data.password) {
      throw new Error('Username and password are required');
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: data.username,
        password: data.password,
      });

      if (response.data.success) {
        return true;
      }
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const login = async (data) => {
    if (!data.username || !data.password) {
      throw new Error('Username and password are required');
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const tokenData = response.data.data.token;

        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        return true;
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (isLoading) {
    return null; // or loading component
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
