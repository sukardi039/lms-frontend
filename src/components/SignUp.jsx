import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { encrypter } from "../lib/encrypter";

const SignUp = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [error, setError] = useState();

  /**
   * React Hook Form methods for form state management.
   *
   * @constant
   * @type {Object}
   * @property {Object} control - Control object for React Hook Form to register inputs.
   * @property {Function} handleSubmit - Function to handle form submission.
   * @property {Function} setValue - Function to programmatically set form values.
   * @property {Function} reset - Function to reset the form state.
   */
  const { control, handleSubmit, setValue, reset } = useForm();

  const navigate = useNavigate();

  const createUser = (data) => {
    if (data.password != data.confirmPassword) {
      alert("Please confirm the password that you have provided.");
      return;
    }
    data.role = "member";
    data.status = 1;
    data.password = encrypter(data.password);
    axios({
      method: "POST",
      url: "http://localhost:8080/api/users",
      data: data,
    })
      .then((response) => {
        // booklist.push(response.data);
        setSignedUp(true);
        // setRefresh(!refresh);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <>
      {!signedUp ? (
        <Box
          component="form"
          onSubmit={handleSubmit(createUser)}
          sx={{ p: 2, width: 1 }}
        >
          <Box>
            <Stack spacing={3}>
              <Typography variant="h4" spacing={3}>
                Welcome to our Library!
              </Typography>

              <Typography variant="body">
                Register your membership to enjoy our facinating books
                collection.
              </Typography>

              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Please provide a name as shown in your ID.",
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
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required:
                    "Please confirm the password that you have entered above.",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Confirm Password"
                    type="password"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="emailAddress"
                control={control}
                rules={{
                  required: "Please provide your current email address.",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="eMail address"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="mobileNumber"
                control={control}
                rules={{
                  required: "Please provide your current mobile number.",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Mobile Numjber"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Please provide your current address.",
                  min: 8,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Address"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="/login"
              >
                Already a Member? Sign In
              </Button>
              {/* <h1>Login Details</h1> */}
              {/* <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name: </label>
        <input
        type="text"
        id="username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        />
        <button type="submit">Log In</button>
        </form> */}
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">
            Thank you for signing up with our library!
          </Typography>
          <Typography
            variant="h5"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Please click here to login to explore our books collection.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SignUp;
