import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const { setIsAuthenticated, setUsername, setThisBook } =
    useContext(AuthContext);
  const navigate = useNavigate();

  setThisBook({});
  setUsername({});
  setIsAuthenticated(false);
  navigate("/");

  return (
    <>
      <Typography>Signing out...</Typography>
    </>
  );
};

export default SignOut;
