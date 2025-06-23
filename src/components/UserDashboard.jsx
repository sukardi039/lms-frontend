import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Stack, Typography } from "@mui/material";
import UserLogins from "./UserLogins";
import BorrowedList from "./BorrowedList";
import { useNavigate } from "react-router-dom";
import OverdueList from "./OverdueList";
import OutstandingList from "./OutstandingList";

/**
 * UserDashboard component displays the main dashboard for authenticated users.
 *
 * - Redirects to the home page if the user is not authenticated.
 * - Greets the user by name and provides instructions for browsing books.
 * - Shows lists of borrowed, overdue, and outstanding books.
 *
 * @component
 * @returns {JSX.Element} The rendered user dashboard.
 */
const UserDashboard = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
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
          <Typography variant="h6">
            Thank you for visiting us, {username.name}. Please feel free to
            browse our interesting collection of books.
          </Typography>
          <Typography variant="body">
            Select "Borrow Book" to browse our books.
          </Typography>
          <Box>
            <Stack direction="row" spacing={3} justifyContent={"space-between"}>
              <Box sx={{ width: "40%" }}>
                <BorrowedList />
              </Box>
              <Box sx={{ width: "30%" }}>
                <OverdueList />
              </Box>
              <Box sx={{ width: "30%" }}>
                <OutstandingList />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default UserDashboard;
