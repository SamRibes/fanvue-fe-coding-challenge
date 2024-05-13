export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const baseUrl = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const res = await fetch(`${baseUrl}/posts`);
  const data = await res.json();
  return data as Post[];
}

export async function getComments(postId: number) {
  const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
  const data = await res.json();
  return data as Comment[];
}
