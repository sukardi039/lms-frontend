import { Box, Stack, Skeleton } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import Books from "./Books";
import BookAdd from "./BookAdd";
import Error404 from "./Error404";
// import Post from "./Post";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  flex: "8",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    errorElement: <Error404 />,
  },
  {
    path: "/addbook",
    element: <BookAdd />,
  },
]);

const Landing = () => {
  return (
    <StyledBox>
      {/* <Books /> */}
      <RouterProvider router={router} />
    </StyledBox>
    // <Box flex={4} p={{ xs: 0, md: 2 }}>

    // </Box>
  );
};

export default Landing;
