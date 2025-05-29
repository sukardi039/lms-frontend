import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import BookGrid from "./BookGrid";

const Books = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
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

  const noAction = () => {
    return null;
  };

  if (loading)
    return (
      <Stack spacing={1}>
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
