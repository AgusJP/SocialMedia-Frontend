import React, { useEffect, useState, useRef } from "react";
import Spinner from '../../components/Spinner/Spinner.js';
import { useAuth } from "../../hooks/useAuth.js";
import { useFollow } from "../../hooks/useFollow.js";
import Layout from "../Layout/index.js";
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage.js';
import { Container, Aside, ContainerOwner, ContainerFollows, ContainerFeeds } from "./styles";
import Profile from "../../components/Profile/Profile";
import { useFeed } from "../../hooks/useFeed.js";
import CardFeed from "../../components/CardFeed/CardFeed.js";

export const Home = () => {

  const[page, setPage] = useState(0); 
  const { user } = useAuth();
  const { follows, loading, getFollows } = useFollow();
  const { feeds, getFeeds, setFeeds } = useFeed();

  useEffect(() => {
    getFollows();
    getFeeds(page);

    return () => {
      setFeeds([]);
    }
  },[]);

  return (
    <Layout>
      <Container>
        <Aside>
          <ContainerOwner>
          <Profile 
              img={user && user.avatar_url}
              username={user && user.username}
              isOwner
              name={user && user.name}
            />
          </ContainerOwner>

          <ContainerFollows>
            {follows &&
              follows.map((follow) => (
                <Profile
                  key={follow.id}
                  direction="column"
                  img={follow.avatar_url}
                  usidebar
                  username={follow.username}
                  name={follow.name}
                />
              ))}

            {follows && follows.length === 0 && loading === false && (
              <EmptyMessage message="No sigues nadie, empieza a seguir a tus amigos" />
            )}

            {loading && <Spinner />}
          </ContainerFollows>
        </Aside>

        {<ContainerFeeds>
          {feeds &&
            feeds.map((feed) => <CardFeed key={feed.post.id} feed={feed} />)}

        
        </ContainerFeeds>}
      </Container>
    </Layout>
  );
};
