import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import UserDashboard from "./UserDashboard";
import { timeStamp } from "../lib/timeStamp";
import { encrypter } from "../lib/encrypter";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isAuthenticated, username } = useContext(AuthContext);
  const { control, handleSubmit, setValue, reset } = useForm();

  const checkLogin = (data) => {
    // console.log("bf", data);
    data.password = encrypter(data.password);
    axios({
      method: "GET",
      url:
        "http://localhost:8080/api/users/em/" +
        data.loginUser +
        "/pw/" +
        data.password,
      data: data,
    })
      .then((response) => {
        // booklist.push(response.data);
        if (response.data.emailAddress === data.loginUser) {
          // console.log("af login", data);
          login(response.data);
          setUser(response.data);
          setSignedIn(true);
        } else {
          alert(
            "Log in failed. Please check the supplied credential before log in again."
          );
        }
        // setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    if (user.user_id) {
      const data = {};
      data.user_id = user.user_id;
      data.timeLogin = timeStamp();
      console.log("bf", data);
      axios({
        method: "POST",
        url: "http://localhost:8080/api/userlogins",
        data: data,
      })
        .then((response) => {
          // booklist.push(response.data);
          if (response.data.emailAddress === data.loginUser) {
            console.log("af", response.data);
          } else {
            alert(
              "Log in failed. Please check the supplied credential before log in again."
            );
          }
          // setRefresh(!refresh);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
  }, [signedIn, user]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login(user);
  //   navigate("/profile");
  // };
  const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    flex: "8",
    width: "70%",
  });

  return (
    // <StyledBox
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "600",
    //   }}
    // >
    <>
      {isAuthenticated ? (
        <UserDashboard />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit(checkLogin)}
          sx={{ p: 2, width: 1 }}
        >
          <Box>
            <Stack spacing={3}>
              <Typography variant="h4" spacing={3}>
                Welcome to our Library!
              </Typography>

              <Typography variant="h6">
                Please enter your user name and password to access.
              </Typography>

              <Controller
                name="loginUser"
                control={control}
                rules={{
                  required: "Please Enter Your Name to Log In",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="User Name"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Please supply the correct credential.",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Password"
                    type="password"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="/signup"
              >
                Sign-up
              </Button>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="/"
              >
                I will do it later
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </>
    // </StyledBox>
  );
};

export default SignIn;
