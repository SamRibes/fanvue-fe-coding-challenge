// Depending on the number of endpoints and size of the
// code base I would split up the type definitions into
// a seperate file.

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

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const baseUrl = "https://jsonplaceholder.typicode.com";

// Again small code base so these are all in one place

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

export async function getAlbums() {
  const res = await fetch(`${baseUrl}/albums`);
  const data = await res.json();
  return data as Album[];
}

export async function getPhotos(albumId: number) {
  const res = await fetch(`${baseUrl}/albums/${albumId}/photos`);
  const data = await res.json();
  return data as Photo[];
}
