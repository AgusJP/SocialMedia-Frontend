import React, { createContext, useCallback, useState } from 'react';
import { api } from '../services/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if(token && user){
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {token, user: JSON.parse(user)}
    }

    return {user: null, token: null};
  });

  const signIn = useCallback(async ({username, password}) => {
    const auth = await api.post('/auth', { username, password })

    if(auth.status === 200){
      const { token } = auth.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const user = await api.get('/auth/me');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user.data));
      setData({
        user: user.data,
        token,
      })
    }
  },[]);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setData({
      user: null,
      token: null
    })
  },[])

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}
