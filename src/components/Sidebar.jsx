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
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BrowserRouter, HashRouter, Link } from "react-router-dom";

const ErrorFallback = ({ error }) => {
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>;
};

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "none", sm: "none", md: "block" }, width: "15%" }}
    >
      <Box position="fixed">
        <BrowserRouter>
          {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/addbook">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Add Books" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/editbook">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Edit Books" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: "none" }}>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch
                  onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
                />
              </ListItemButton>
            </ListItem>
          </List>
          {/* </ErrorBoundary> */}
        </BrowserRouter>
      </Box>
    </Box>
  );
};

export default Sidebar;
