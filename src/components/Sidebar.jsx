/**
 * Sidebar component displays a navigation menu based on the authenticated user's role.
 *
 * - Renders different navigation options for "admin" and "member" roles.
 * - Uses Material UI components for styling and icons.
 * - Includes a (hidden) dark mode toggle switch.
 * - Shows a logout option for all authenticated users.
 *
 * @component
 * @param {Object} props
 * @param {"light"|"dark"} props.mode - The current theme mode.
 * @param {Function} props.setMode - Function to toggle the theme mode.
 * @returns {JSX.Element} The rendered Sidebar component.
 *
 * @example
 * <Sidebar mode={mode} setMode={setMode} />
 */
import {
  AccountBox,
  LocalLibrary,
  LibraryBooks,
  Article,
  Logout,
  Refresh,
  Gavel,
  Payments,
  ReplyAll,
  Paid,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ErrorFallback = ({ error }) => {
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>;
};

const Sidebar = ({ mode, setMode }) => {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <>
      <Box
        flex={2}
        p={2}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          width: "15%",
        }}
      >
        {isAuthenticated ? (
          <Box position="fixed">
            {/* <BrowserRouter> */}
            <nav>
              {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
              <List>
                {username.role == "admin" && (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/admindashboard">
                        <ListItemIcon>
                          <Home />
                        </ListItemIcon>
                        <ListItemText primary="Homepage" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/editbook">
                        <ListItemIcon>
                          <Article />
                        </ListItemIcon>
                        <ListItemText primary="Books Information" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/payment">
                        <ListItemIcon>
                          <Payments />
                        </ListItemIcon>
                        <ListItemText primary="Fees Payment" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
                {username.role == "member" && (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/userdashboard">
                        <ListItemIcon>
                          <Home />
                        </ListItemIcon>
                        <ListItemText primary="Homepage" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/borrow">
                        <ListItemIcon>
                          <LocalLibrary />
                        </ListItemIcon>
                        <ListItemText primary="Borrow Books" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/return">
                        <ListItemIcon>
                          <ReplyAll />
                        </ListItemIcon>
                        <ListItemText primary="Return Books" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/renew">
                        <ListItemIcon>
                          <Refresh />
                        </ListItemIcon>
                        <ListItemText primary="Renew Books" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/payfees">
                        <ListItemIcon>
                          <Paid />
                        </ListItemIcon>
                        <ListItemText primary="Pay Lete Fees" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to="/tnc">
                        <ListItemIcon>
                          <Gavel />
                        </ListItemIcon>
                        <ListItemText primary="Terms and Conditions" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/signout">
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "none" }}>
                  <ListItemButton component={Link} to="#simple-list">
                    <ListItemIcon>
                      <ModeNight />
                    </ListItemIcon>
                    <Switch
                      onChange={() =>
                        setMode(mode === "light" ? "dark" : "light")
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              {/* </ErrorBoundary> */}
            </nav>
            {/* </BrowserRouter> */}
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Sidebar;
