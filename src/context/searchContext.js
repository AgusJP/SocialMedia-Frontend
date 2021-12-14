import React, { createContext, useCallback, useState } from 'react';
import { api } from '../services/api.js';

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {

  const[users, setUsers] = useState([]);
  const[loading, setLoading] = useState(true);

  const searchAction = useCallback(async (term) => {
    try {
        setLoading(true);
        const res = await api.get(`/search/any?term=${term}`)
        if(res.status === 200) setUsers(res.data);
    } catch (error) {
      console.log(error.response.message);
    }finally{
      setLoading(false);
    }

  },[])

  return (
    <SearchContext.Provider value={{users, loading, searchAction, setUsers, setLoading}}>
      {children}
    </SearchContext.Provider>
  )
}

