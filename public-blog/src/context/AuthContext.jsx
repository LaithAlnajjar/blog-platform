import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, [storedUser, storedToken]);

  const register = async (data) => {
    try {
      const { username, password } = data;
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });
      if (response.data.success) {
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (data) => {
    try {
      const { username, password } = data;
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      if (response.data.success) {
        setUser(response.data.data.user);
        setToken(response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.token);
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
