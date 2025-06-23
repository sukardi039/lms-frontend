import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import BorrowedList from "./BorrowedList";
import OverdueList from "./OverdueList";
import OutstandingList from "./OutstandingList";

/**
 * Rightbar component displays contextual information and actions
 * based on the current user action in the LMS frontend.
 *
 * - Shows different lists (Borrowed, Overdue, Outstanding) when borrowing or returning books.
 * - Displays instructions for signing in or editing book records.
 * - Only visible on large screens (lg and up).
 *
 * @component
 * @returns {JSX.Element} The rendered Rightbar component.
 */
const Rightbar = () => {
  const [action, setAction] = useState(null);
  const { isAuthenticated, username, currentAction } = useContext(AuthContext);

  return (
    <Box
      flex={2}
      padding={2}
      sx={{
        display: {
          // xs: "none",
          // sm: "none",
          md: "none",
          lg: "block",
        },
        width: "15%",
      }}
    >
      <Box>
        {currentAction == "borrow" && (
          <>
            {/* <Typography>Please click on the a book to borrow</Typography> */}
            <BorrowedList />
            <OverdueList />
            <OutstandingList />
          </>
        )}
        {currentAction == "return" && (
          <>
            {/* <Typography>Please click on the book to return</Typography> */}
            <BorrowedList />
            <OverdueList />
            <OutstandingList />
          </>
        )}
        {currentAction == "signin" && (
          <>
            <Typography>
              Please provide your username (email address) and password to sign
              in
            </Typography>
          </>
        )}
        {currentAction == "edit" && (
          <>
            <Typography>
              Use this function to maintain our book record
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Rightbar;
