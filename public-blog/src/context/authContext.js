import { useContext, useState, useEffect, createContext } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
