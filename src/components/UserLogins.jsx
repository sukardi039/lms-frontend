import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Box, Divider, Stack, Typography } from "@mui/material";

const UserLogins = () => {
  const { isAuthenticated, username } = useContext(AuthContext);

  const [loginList, setLoginList] = useState();
  const [loginCount, setLoginCount] = useState();
  const [error, setError] = useState();
  console.log(username);

  useEffect(() => {
    console.log("getting logn list", username);
    axios({
      method: "GET",
      url: "http://localhost:8080/api/userLogins/" + username.user_id,
    })
      .then((response) => {
        setLoginCount(response.data.length);
        const lastTen = response.data.slice(-10);
        lastTen.sort((a, b) => b - a);
        setLoginList(lastTen);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [username, isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <Box>
          <Stack>
            <Typography variant="h6">
              You have visited our {loginCount} times.
            </Typography>
            <Typography variant="h6">Last 10 visits were on:</Typography>
            <Divider></Divider>
            <Box>
              {loginList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid black",
                    padding: "8px",
                    margin: "4px",
                  }}
                >
                  {item.timeLogin}
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default UserLogins;
