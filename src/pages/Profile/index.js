import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import Layout from '../Layout';
import avatar from '../../assets/noImageUser.png';
import { Container, DescriptionContainer, ImageProfile, Username, Button, ButtonFollow, CountsContainer, Description, ContainerPhotos, Photo} from './styles';
import { useFeed } from '../../hooks/useFeed';

function Profile() {
  const { username } = useParams();
  const { deleteFollowAction } = useFeed();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const response = await api.get(`/users/${username}`, {
        params: {
          page: 0,
          pageSize: 12,
        }
      });
      
      const { AmIFollow: isFollowing, isMyProfile: isMyprofile, numberOfFollowers, numberOfFollows, numberOfPosts, user } = response.data;

      setIsFollow(isFollowing);
      setIsMyProfile(isMyprofile);
      setCount({
        numberOfFollowers,
         numberOfFollows,
          numberOfPosts
      })
      setUser(user);
      setPosts(user.postUploads);
    }

    getProfile(); 
  }, [username]);

  const loadingMemo = useMemo(() => {
    return user && user.id ? false : true;
  },[user])

  const handleFollowButton = useCallback(async(id) => {
    try {
      setLoading(true);
      deleteFollowAction(id);
      setIsFollow(!isFollow);
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  },[deleteFollowAction, isFollow])

  if(loadingMemo) {
    return <p>Cargando...</p>
  }

  return (
    <Layout>
      <Container>
        <DescriptionContainer>
          <ImageProfile src={user.avatar_url ||avatar } alt={user.name} />

          <div>
            <Username>{user.username}</Username>
            
            {isMyProfile ? (
              <></>
            ): isFollow ? (
              <ButtonFollow
                onClick={() => handleFollowButton(user.id)}
                disabled={loading ? true : false}
              >
                {loading ? "Cargando..." : "Siguiendo"}
              </ButtonFollow>
            ): (
              <ButtonFollow
                onClick={() => handleFollowButton(user.id)}
                disabled={loading ? true : false}
              >
                {loading ? "Cargando..." : "Seguir"}
              </ButtonFollow>
            )}
            <CountsContainer>
              <span>{count.numberOfPosts} publicaciones</span>
              <span>{count.numberOfFollowers} seguidores</span>
              <span>{count.numberOfFollows} seguidos</span>
            </CountsContainer>
          </div>

          <Description>
            <p>{user.name}</p>
            <span>{user.biography}</span>
          </Description>
        </DescriptionContainer>

        <ContainerPhotos>
          {posts.length > 0 && posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <Photo src={post.post_url} alt={post.content}/>
            </Link>
          ))}
        </ContainerPhotos>
      </Container>
    </Layout>
  )
}

export default Profile;