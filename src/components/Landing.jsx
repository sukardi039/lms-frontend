import { Box, Stack, Skeleton } from "@mui/material";
import styled from "styled-components";
import React, { useState } from "react";
import Books from "./Books";
// import Post from "./Post";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  flex: "8",
});
const Landing = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledBox>
      <Books />
    </StyledBox>
    // <Box flex={4} p={{ xs: 0, md: 2 }}>

    // </Box>
  );
};

export default Landing;
