import React, { useState, useCallback, useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useFeed } from '../../hooks/useFeed.js';
import { useUpload } from '../../hooks/useUpload.js';
import Upload from '../Upload/index.js';
import { StyledModal } from './styles.js';

const UploadPost = () => {
  const [isOpen, setIsOpen]= useState(false);
  const [opacity, setOpacity]= useState(0);
  const { data, resetValues } = useUpload();
  const { addFeed } = useFeed();

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen)
  },[isOpen])

  const afterOpen = useCallback(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100)
  },[])

  const beforeClose = useCallback(() => {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    })
  },[])
    
  useEffect(() => {
    if(data){
      toggleModal();
      addFeed(data);
      resetValues();
      console.log(data)
    }
  },[data, resetValues, toggleModal])
 
  return (
    <>
      <FiUpload size={25} onClick={toggleModal} />

      <StyledModal 
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={opacity}
      >
        <Upload />
      </StyledModal>
    </>
  )
}

export default UploadPost;