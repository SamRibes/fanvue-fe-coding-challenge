import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect } from "react";
import { CircularProgress, styled } from "@mui/material";
import { getPhotos, Photo } from "../api";

// Generic container is the same as others.
// Would ideally be a shared component

const PhotosContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "24px",
  gap: "24px",
});

export default function PhotoAlbum() {
  const router = useRouter();
  const { id } = router.query;
  const idAsNumber = Number(id);
  const [loading, setLoading] = React.useState(true);
  const [photos, setPhotos] = React.useState<Photo[] | undefined>(undefined);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!Number.isNaN(idAsNumber)) {
        const res = await getPhotos(Number(id));
        setPhotos(res);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [id]);

  // Initial picture loading is slow.
  // A spinner while they load would be good
  return (
    <PhotosContainer>
      {loading && <CircularProgress />}
      {!loading &&
        photos &&
        photos.map((photo) => {
          return (
            // Link to the photo in new tab
            <a href={photo.url} target="_blank" key={photo.id}>
              {/* Used the Next Js image component. 
              Not 100% sure about how it works but it's meant to be more efficient */}
              <Image
                key={photo.id}
                alt={photo.title}
                src={photo.thumbnailUrl}
                width={150}
                height={150}
              />
            </a>
          );
        })}
    </PhotosContainer>
  );
}
