import React, { useState, useCallback } from 'react';
import { StyledModal, MoreOptions } from './styles';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useFeed } from '../../hooks/useFeed';
import { useFollow } from '../../hooks/useFollow';

function MoreOptionsModal({ isAutor, post }) {

  const { deletePostAction, deleteFollowAction } = useFeed();
  const { removeFollow } = useFollow();
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity]= useState(0);

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
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

  const handleDelete = useCallback((post) => {
    deletePostAction(post);
    toggleModal();
  },[deletePostAction, toggleModal])

  const handleFollow = useCallback((idUser) => {
    deleteFollowAction(idUser);
    removeFollow(idUser);
    toggleModal();
  },[deleteFollowAction, removeFollow, toggleModal])

  return (
    <>
      <FiMoreHorizontal size={20} style={{cursor: 'pointer'}} onClick={toggleModal}/>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >

        {isAutor ? (
          <MoreOptions>
            <li>Ir a la publicación</li>
            <li className="red" onClick={() => handleDelete(post)}>
              Eliminar publicación
            </li>
            <li onClick={toggleModal}>Cancelar</li>
          </MoreOptions>
        ): (
          <MoreOptions>
            <li>
              <Link to={`/post/${post.id}`}>Ir a la publicación</Link>
            </li>
            <li className="red" onClick={() => handleFollow(post.user_id)}>
              Dejar de seguir
            </li>
            <li onClick={toggleModal}>Cancelar</li>
          </MoreOptions>
        )}

      </StyledModal>
    </>
  )
}

export default React.memo(MoreOptionsModal);