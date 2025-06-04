import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";
import UserLogins from "./UserLogins";

const AdminDashboard = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ marginTop: "30px" }}>
        <Stack spacing={3}>
          <Typography variant="h6">Welcome back, {username.name}.</Typography>
          <Typography variant="body">
            Thank you for your hardworks in keeping this library running.
          </Typography>
          <Typography variant="body">
            Select "Maintain Book" to udpate our book collections.
          </Typography>
          <Box>
            <Stack direction="row" spacing={3}>
              <Box>{/* <UserLogins user={user} /> */}</Box>
              <Box></Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;
