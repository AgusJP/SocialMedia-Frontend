import { useContext } from 'react';
import { FollowContext } from '../context/followContex';

export function useFollow() {
    const context = useContext(FollowContext);
  
    if(!context) throw new Error('useFollow must be used within an FollowProvider');
  
    return context;
  }