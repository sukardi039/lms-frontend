// export default Landing;

import { Box } from "@mui/material";
import styled from "styled-components";

/**
 * A styled Box component with flex layout, centered content, and a gap between items.
 *
 * @component
 * @example
 * <StyledBox>
 *   <ChildComponent />
 *   <AnotherChild />
 * </StyledBox>
 *
 * @description
 * This component uses flex display to center its children both vertically and horizontally,
 * applies a gap of 10px between them, takes up 8 parts of the flex container, and has a width of 70%.
 */
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
