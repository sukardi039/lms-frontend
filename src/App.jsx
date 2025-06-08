import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
} from "@mui/material";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Books from "./components/Books";
import BookEdit from "./components/BookEdit";
import SignIn from "./components/SignIn";
import { Article, Home, Login, ModeNight } from "@mui/icons-material";
import SignUp from "./components/SignUp";
import BorrowBooks from "./components/BorrowBooks";
import ReturnBooks from "./components/ReturnBooks";
import RenewBooks from "./components/RenewBooks";
import Payment from "./components/Payment";
import BorrowThisBook from "./components/BorrowThisBook";
import SignOut from "./components/SignOut";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ReturnThisBook from "./components/ReturnThisBook";
import TermsAndConditions from "./components/TermsAndConditions";
import RenewThisBook from "./components/RenewThisBook";

// import "./App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Box>
            <NavBar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Sidebar></Sidebar>
              <Landing>
                <Routes>
                  <Route index element={<Books />} />
                  <Route path="/" element={<Books />} />
                  <Route path="/home" element={<Books />} />
                  <Route path="/editbook" element={<BookEdit />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/borrow" element={<BorrowBooks />} />
                  <Route path="/return" element={<ReturnBooks />} />
                  <Route path="/renew" element={<RenewBooks />} />
                  <Route path="/borrowthisbook" element={<BorrowThisBook />} />
                  <Route path="/returnthisbook" element={<ReturnThisBook />} />
                  <Route path="/renewthisbook" element={<RenewThisBook />} />
                  <Route path="/tnc" element={<TermsAndConditions />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="/userdashboard" element={<UserDashboard />} />
                  <Route path="/admindashboard" element={<AdminDashboard />} />
                </Routes>
              </Landing>
              <Rightbar />
            </Stack>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
