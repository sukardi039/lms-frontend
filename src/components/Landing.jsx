import { Box, Stack, Skeleton } from "@mui/material";
import styled from "styled-components";
import React from "react";
import Books from "./Books";
// import Post from "./Post";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  flex: "8",
});
const Landing = () => {
  return (
    <StyledBox>
      <Books />
    </StyledBox>
    // <Box flex={4} p={{ xs: 0, md: 2 }}>

    // </Box>
  );
};

export default Landing;
