// import { Box, Stack, Skeleton } from "@mui/material";
// import {
//   BrowserRouter as Router,
//   Routes,
//   createBrowserRouter,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import styled from "styled-components";
// import React from "react";
// import Books from "./Books";
// // import BookAdd from "./BookAdd";
// import BookEdit from "./BookEdit";
// import Error404 from "./Error404";
// import Login from "./Login";
// import SignUp from "./SignUp";
// // import Post from "./Post";

// const StyledBox = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "10px",
//   flex: "8",
//   width: "70%",
// });

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Books />,
//     errorElement: <Error404 />,
//   },
//   {
//     path: "/home",
//     element: <Books />,
//   },
//   {
//     path: "/editbook",
//     element: <BookEdit />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
// ]);

// const Landing = () => {
//   return (
//     <StyledBox>
//       {/* <Router> */}
//       {/* <Books /> */}
//       {/* <RouterProvider router={router} /> */}
//       <Routes>
//         <Route path="/" element={<Books />} />
//         <Route path="/home" element={<Books />} />
//         <Route path="/editbook" element={<BookEdit />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//       {/* </Router> */}
//     </StyledBox>
//     // <Box flex={4} p={{ xs: 0, md: 2 }}>

//     // </Box>
//   );
// };

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
