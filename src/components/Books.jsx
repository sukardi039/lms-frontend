import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import BookGrid from "./BookGrid";
import { AuthContext } from "../context/AuthContext";

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, username } = useContext(AuthContext);

  useEffect(() => {
    let burl = window.location.href;
    // console.log("url", url);
    let ura = burl.split("/");
    let url = "http://localhost:8080/api/books";
    if (isAuthenticated) {
      if (ura[3] == "return") {
        url = url + "/borrowed/" + username.user_id;
      }
      if (ura[3] == "renew") {
        url = url + "/renew/" + username.user_id;
      }
    }
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const noAction = (book) => {
    console.log(book);
    return null;
  };

  if (loading)
    return (
      <Stack spacing={1} sx={{ width: "80%" }}>
        <Skeleton variant="text" height={100} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="rectangular" height={300} />
      </Stack>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <BookGrid booklist={data} clickAction={noAction}></BookGrid>
      )}
    </Box>
  );
};

export default Books;
