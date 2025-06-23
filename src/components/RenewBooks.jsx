import React, { useContext } from "react";
import Books from "./Books";
import { Box, Stack, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

/**
 * React component for renewing books.
 *
 * This component sets the current user action to "renew" using the AuthContext,
 * and renders the <Books /> component. It assumes the user is authenticated.
 *
 * @component
 * @returns {JSX.Element} The rendered Books component for renewing books.
 */
const RenewBooks = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
  setCurrentAction("renew");
  return (
    <>
      <Books />
    </>
  );
};

export default RenewBooks;
