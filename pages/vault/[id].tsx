import { useRouter } from "next/router";
import React from "react";

export default function PhotoAlbum() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>No album id</p>;
  }

  return <p>Album: {id}</p>;
}
