import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";
import UserLogins from "./UserLogins";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
  setCurrentAction("");
  // return to home page when user is not log in
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !username) {
      setCurrentAction("");
      navigate("/");
    }
  });

  setCurrentAction("");

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
