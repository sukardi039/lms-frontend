import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import BookGrid from "./BookGrid";
import { AuthContext } from "../context/AuthContext";

/**
 * Books component fetches and displays a list of books from the backend API.
 *
 * - If the user is authenticated and the URL path includes "return" or "renew",
 *   it fetches borrowed or renewable books for the current user.
 * - Displays loading skeletons while fetching data.
 * - Shows an error message if the fetch fails.
 * - Renders a BookGrid component with the fetched book data.
 *
 * @component
 * @returns {JSX.Element} The rendered Books component.
 */
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
