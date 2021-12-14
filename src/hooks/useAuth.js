import { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

export function useAuth() {
    const context = useContext(AuthContext);
  
    if(!context) throw new Error('useAuth solo puede ser utilizado dentro de un AuthProvider');
  
    return context;
  }