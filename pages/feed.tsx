import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { getPosts, Post } from "./api";
import PostCard from "../components/Post";
import Head from "next/head";

const PostsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "24px",
  gap: "24px",
});

const Feed: NextPage = () => {
  // Common pattern for loading endpoint data
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const res = await getPosts();
      setPosts(res);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <PostsContainer>
        {loading && <CircularProgress />}
        {!loading && posts?.length === 0 && <p>No posts found</p>}
        {!loading &&
          posts?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
      </PostsContainer>
    </>
  );
};

export default Feed;
