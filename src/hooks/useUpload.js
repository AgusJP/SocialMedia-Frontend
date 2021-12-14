import { useContext } from 'react';
import { UploadContext } from '../context/uploadContext.js';

export function useUpload() {
    const context = useContext(UploadContext);
  
    if(!context) throw new Error('useUpload must be used within an UploadProvider');
  
    return context;
  }