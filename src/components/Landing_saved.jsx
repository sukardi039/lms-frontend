import { Box, Stack, Skeleton } from "@mui/material";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import Books from "./Books";
import BookAdd from "./BookAdd";
import BookEdit from "./BookEdit";
import Error404 from "./Error404";
// import Post from "./Post";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  flex: "8",
  width: "70%",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    errorElement: <Error404 />,
  },
  {
    path: "/editbook",
    element: <BookEdit />,
  },
]);

const Landing = () => {
  return (
    <StyledBox>
      {/* <Outlet /> */}
      {/* <Books /> */}
      <RouterProvider router={router} />
    </StyledBox>
    // <Box flex={4} p={{ xs: 0, md: 2 }}>

    // </Box>
  );
};

export default Landing;
