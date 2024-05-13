import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { Album, getAlbums } from "../api";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const AlbumsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "24px",
  gap: "24px",
});

const Vault: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<Album[] | undefined>(undefined);

  useEffect(() => {
    async function fetchAlbums() {
      setLoading(true);
      const res = await getAlbums();
      setAlbums(res);
      setLoading(false);
    }
    fetchAlbums();
  }, []);

  return (
    <>
      <Head>
        <title>Vault</title>
      </Head>
      <AlbumsContainer>
        {loading && <CircularProgress />}
        {!loading && albums?.length === 0 && <p>No albums found</p>}
        {!loading &&
          albums?.map((album) => {
            return (
              <Card key={album.id} sx={{ width: "50%" }}>
                <CardHeader role="heading" title={album.title} />
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => router.push(`/vault/${album.id}`)}
                  >
                    Go to album
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </AlbumsContainer>
    </>
  );
};

export default Vault;
