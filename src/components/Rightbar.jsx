import React from "react";
import { Box } from "@mui/material";

const Rightbar = () => {
  return (
    <Box
      flex={2}
      padding={2}
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block",
        },
        width: "15%",
      }}
    >
      <Box pisition="fixed">Rightbar</Box>
    </Box>
  );
};

export default Rightbar;
