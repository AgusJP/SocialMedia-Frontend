import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
//Para formatear las fechas y actualiza las fechas automáticamente
import TimeAgo from "react-timeago";
//Formatos de la libreria
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Profile from '../Profile/Profile.js';
import { Card, CardHeader, ContainerPost, PostCard, CardControls, CardDetails, TimeAgo as StyleTimeAgo, CardFooter } from './styles';
import MoreOptionsModal from '../Modal/MoreOptionsModal.js';
import { FaHeart, FaInfo } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import { toast } from 'react-toastify';

//Para cargar los comentario de manera lazy a la hora de traernos los feeds
const CommentList = lazy(() => import("../CommentList/CommentList.js"));

const formatter = buildFormatter(spanishString);

function CardFeed({ feed }) {
  const { isAutor, isLiked, post} = feed;
  const [like, setLike] = useState(isLiked);
  const [commentsPost, setCommentsPost] = useState(post.getComments);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if(comment.trim()){
      setDisabled(false);
    }else {
      setDisabled(true);
    }
  },[comment])

  const toggleLike = useCallback(async (post_id) => {
    const response = await api.post(`/likes/${post_id}`);

    if(response.status === 200) {
      setLike(!like);
    }else {
      toast.error('Esta Publicación ya no existe!');
    }
  },[like])

  const handleComment = useCallback((event) => {
    setComment(event.target.value);
  },[])

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const response = await api.post(`/comments/${post.id}`, {content: comment});
    if(response.status === 200) {
      setCommentsPost((state) => [...state, response.data]);
      setComment('');
      setDisabled(true);
    }
    
  },[comment, post.id])


  return (
    <Card>
      <CardHeader>
        <Profile 
          direction="row"
          img={post.uploadedBy.avatar_url}
          username={post.uploadedBy.username}
        />

        <MoreOptionsModal isAutor={isAutor} post={post} />

      </CardHeader>

      <ContainerPost>
        <PostCard src={post.post_url} alt={post.post_url}/>
      </ContainerPost>

      <CardControls>
        {like ? (
          <FaHeart
            onClick={() => toggleLike(post.id)} 
            size={20} 
            style={{color: "#FC4850", marginRight: 10}} 
          />
        ): (
          <FiHeart 
            onClick={() => toggleLike(post.id)} 
            size={20} 
            style={{marginRight: 10}} 
          />
        )}

        <Link to={`/post/${post.id}`}>
          <FaInfo size={20} color="#2c2c2c"/>
        </Link>

      </CardControls>

      <CardDetails>
        <p style={{ fontWeight: "bold"}}>
          {post.uploadedBy.username}
          <span 
            style={{
              marginLeft: 5,
              fontWeight: "normal",
              marginBottom: 10,
              display: "inline-block"
            }}
          >
            {post.content}
          </span>
        </p>
        
        <Suspense fallback={<p>Cargando...</p>}>
          {commentsPost.length > 0 && (
            <CommentList comments={commentsPost} />
          )}
        </Suspense>

        <StyleTimeAgo>
          <TimeAgo date={`${post.createdAt}Z`} formatter={formatter} />
        </StyleTimeAgo>

        <Link 
          to={`/post/${post.id}`} 
          style={{
            fontWeight: "bold", 
            textDecoration: 'none', 
            color: '#999999', 
            marginTop: '10px', 
            display: 'block'}} 
          >
            Ver más detalles
          </Link>

      </CardDetails>

      <CardFooter>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleComment}
            placeholder="Añade un comentario"
          />
          <button type="submit" disabled={disabled}>
            Publicar
          </button>
        </form>
      </CardFooter>

    </Card>
  )
}

export default CardFeed;