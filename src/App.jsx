import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import React, { useContext } from "react";
// import "./App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Box>
          <NavBar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Landing />
            <Rightbar />
          </Stack>
        </Box>
      </AuthProvider>
    </div>
  );
}

export default App;
