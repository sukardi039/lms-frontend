import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Rightbar = () => {
  const [action, setAction] = useState(null);

  useEffect(() => {
    let burl = window.location.href;
    console.log("url", burl);
    let ura = burl.split("/");
    setAction(ura[3]);
  }, [window.location.href]);
  return (
    <Box
      flex={2}
      padding={2}
      sx={{
        display: {
          // xs: "none",
          // sm: "none",
          md: "none",
          lg: "block",
        },
        width: "15%",
      }}
    >
      <Box position="fixed">
        {action == "borrow" && (
          <Typography>Please click on the a book to borrow</Typography>
        )}
        {action == "return" && (
          <Typography>Please click on the book to return</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Rightbar;
