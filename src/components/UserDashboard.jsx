import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";

const UserDashboard = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Stack spacing={3}>
          <Typography variant="h6">
            Thank you for viiting us, {username.name}. Please feel free to
            browse our interesting collection of books.
          </Typography>
          <Typography variant="body">
            Select "Borrow Book" to browse our books.
          </Typography>
          <Typography variant="body">
            When you are ready, click on the cart icon to borrow the book.
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default UserDashboard;
