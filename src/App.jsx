import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import "./App.css";

function App() {
  return (
    <div>
      <Box>
        <NavBar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Landing />
          <Rightbar />
        </Stack>
      </Box>
    </div>
  );
}

export default App;
