import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Post } from "../pages/api";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <Card role="article" key={post.id} style={{ width: "50%" }}>
      <CardHeader role="heading" title={post.title} />
      <CardContent role="post body">
        <p>{post.body}</p>
      </CardContent>
    </Card>
  );
}
