/**
 * SignOut component handles the user sign-out process.
 *
 * This component:
 * - Resets authentication state and user-related context values.
 * - Navigates the user to the home page ("/").
 * - Displays a "Signing out..." message.
 *
 * @component
 * @returns {JSX.Element} A message indicating the user is signing out.
 */
import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const { setIsAuthenticated, setUsername, setThisBook, setCurrentAction } =
    useContext(AuthContext);
  const navigate = useNavigate();
  setCurrentAction("");

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
