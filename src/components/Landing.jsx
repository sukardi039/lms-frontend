// export default Landing;

import { Box } from "@mui/material";
import styled from "styled-components";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  flex: "8",
  width: "70%",
});

const Landing = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default Landing;
