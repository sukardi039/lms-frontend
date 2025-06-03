import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  LibraryBooks,
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
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/home">
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
                  <ListItemButton component={Link} to="/borrow">
                    <ListItemIcon>
                      <Article />
                    </ListItemIcon>
                    <ListItemText primary="Borrow Books" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "none" }}>
                  <ListItemButton component={Link} to="#simple-list">
                    <ListItemIcon>
                      <ModeNight />
                    </ListItemIcon>
                    <Switch
                      onChange={(e) =>
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
