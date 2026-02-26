'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const storedUser = localStorage.getItem('rexUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${apiUrl}/users/login`, {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem('rexUser', JSON.stringify(data));
      router.push('/admin/dashboard');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rexUser');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
