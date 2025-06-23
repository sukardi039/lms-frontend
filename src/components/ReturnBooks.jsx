/**
 * ReturnBooks component sets the current action to "return" in the AuthContext
 * and renders the Books component. Intended for use in the book return flow.
 *
 * @component
 * @returns {JSX.Element} The rendered Books component for returning books.
 */
import React, { useContext } from "react";
import Books from "./Books";
import { Box, Stack, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const ReturnBooks = () => {
  const { isAuthenticated, username, setCurrentAction } =
    useContext(AuthContext);
  setCurrentAction("return");
  return (
    <>
      <Books />
    </>
  );
};

export default ReturnBooks;
