import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (data) => {
    try {
      const { username, password } = data;
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('site', response.data.token);
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
