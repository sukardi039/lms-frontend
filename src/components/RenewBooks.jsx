import React, { useContext } from "react";
import Books from "./Books";
import { Box, Stack, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

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
