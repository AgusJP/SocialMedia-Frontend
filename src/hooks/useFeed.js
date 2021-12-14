import { useContext } from 'react';
import { FeedContext } from '../context/feedContext.js';

export function useFeed() {
    const context = useContext(FeedContext);
  
    if(!context) throw new Error('useFeed must be used within an FeedProvider');
  
    return context;
  }
  
