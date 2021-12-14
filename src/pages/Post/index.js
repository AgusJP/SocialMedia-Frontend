import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import spanishString from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useParams } from "react-router-dom";
import { api } from "../../services/api.js";
import { FaHeart, FaComment } from "react-icons/fa";
import Layout from "../Layout";
import Profile from "../../components/Profile/Profile.js";
import {
  Container,
  ContainerPhoto,
  Img,
  ContainerPost,
  HeaderPost,
  ContainerComments,
  TimeStyle,
  ContainerOptions,
  ContainerComment,
} from "./styles";

const formatter = buildFormatter(spanishString);

function Post() {
  const { post_id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getPost() {
      const response = await api.get(`/posts/${post_id}`);

      const { post } = response.data;
      setPost(post);
      setComments(post.getComments);
    }
    getPost();
  }, [post_id]);

  if (!post) {
    return (
      <Container>
        <p>Cargando...</p>
      </Container>
    );
  } else {
    return (
      <Layout>
        <Container>
          <ContainerPhoto>
            <Img src={post.post_url} alt={post.content} />
          </ContainerPhoto>

          <ContainerPost>
            <HeaderPost>
              <Profile
                img={post.uploadedBy.avatar_url}
                username={post.uploadedBy.username}
              />
              <p>Descripción: {post.content}</p>
            </HeaderPost>

            <ContainerComments>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} style={{ marginBottom: "10px" }}>
                    <Profile
                      img={comment.postedBy.avatar_url}
                      username={comment.postedBy.username}
                    />

                    <p style={{ margin: "5px 0" }}>{comment.content}</p>

                    <TimeStyle>
                      <TimeAgo
                        date={`${comment.createdAt}`}
                        formatter={formatter}
                      />
                    </TimeStyle>
                  </div>
                ))
              ) : (
                <p>No hay comentarios para mostrar</p>
              )}
            </ContainerComments>

            <ContainerComment>
              <span>
                Esta publicación tiene un total de {post.likesCount}
                <FaHeart
                  size={20}
                  style={{ color: "#FC4850", marginRight: 10 }}
                />
              </span>
              <span>
                Esta publicación tiene un total de {post.getComments.length}
                <FaComment size={20} color="#2c2c2c" />
              </span>
            </ContainerComment>
            
          </ContainerPost>
        </Container>
      </Layout>
    );
  }
}

export default Post;
