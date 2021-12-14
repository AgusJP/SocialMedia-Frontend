import React, { createContext, useCallback, useState } from 'react';
import { api } from '../services/api.js';
import { toast } from 'react-toastify';

export const FeedContext = createContext();

export const FeedProvider = ({children}) => {

  const[feeds, setFeeds] = useState([]); 
  const[totalFeeds, setTotalFeeds] = useState(null);

  const getFeeds = useCallback(async (page = 0) => {
    try {
      const res = await api.get("/feeds", {
        params: {
          page,
          pageSize: 12
        }
      });

      if(res.status === 200){
        setFeeds((state) => [...state, ...res.data]);
        setTotalFeeds(res.headers["CountPosts"])
      }
    } catch (error) {
      console.log(error.response);
    }
  },[])

  const deletePostAction = useCallback(async (post) => {
    try {
      const response = await api.delete(`/posts/${post.id}`, 
      {
        params: { 
          key: post.key
        }
      }
      )

      if(response.status === 200) {
        setFeeds((state) => state.filter((item) => item.post.id !== post.id ))
      }
    } catch (error) {
      toast.error('No se pudo eliminar la foto correctamente');
    }
  },[])

  const deleteFollowAction = useCallback(async (idUser) => {
    try {
      const response = await api.post(`/follows/${idUser}`);
      if(response.status === 200) {
        setFeeds((state) => state.filter((item) => item.post.user_id !== idUser))
      }
    } catch (error) {
      toast.error('Error al dejar de seguir a este usuario');
    }
  },[])

  const addFeed = useCallback((data) => {
    setFeeds((state) => [data, ...state]);
  },[])

  return (
    <FeedContext.Provider value={{feeds, totalFeeds, getFeeds, deletePostAction, deleteFollowAction, addFeed, setFeeds}}>
      {children}
    </FeedContext.Provider>
  )
}

