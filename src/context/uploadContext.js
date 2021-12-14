import React, { createContext, useCallback, useState } from 'react';
import { api } from '../services/api';

export const UploadContext = createContext();

export const UploadProvider = ({children}) => {

  const[data, setData] = useState(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(false);

  const uploadPost = useCallback(async (dataImage) => {
    try {
      setLoading(true);
      const fd = new FormData();

      fd.append('file', dataImage.file, dataImage.file.name);
      fd.append('content', dataImage.description);

      const res = await api.post('/posts', fd);

      if(res.status === 200) {
        setData(res.data);
      }   
    } catch (error) {
      if(error.response.status === 500) {
        setError(true);
      }
    }finally {
      setLoading(false)
    }
  },[])

  const resetValues = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(false);
  } ,[])

  return (
    <UploadContext.Provider value={{data, loading, error, uploadPost, resetValues}}>
      {children}
    </UploadContext.Provider>
  )
}
