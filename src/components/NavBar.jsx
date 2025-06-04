import { AppBar } from "@mui/material";
import { styled, Toolbar, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Beenhere } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputBase, Badge, Avatar, Menu, MenuItem } from "@mui/material";
import { Mail, Notifications } from "@mui/icons-material";

import React, { useContext } from "react";
import { useState } from "react";
import { Link, unstable_createContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));
const Icon = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, username } = useContext(AuthContext);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          Library Management System
        </Typography>
        <Beenhere sx={{ display: { sm: "block", md: "none" } }} />
        <Icon>
          <Badge
            color="error"
            badgeContent={2}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Mail />
          </Badge>
          <Badge
            color="error"
            badgeContent={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Notifications />
          </Badge>
          <Link to="/signin">
            <Avatar
              sx={{
                width: 30,
                height: 30,
                display: isAuthenticated ? "none" : "block",
              }}
              src="images/default.png"
            />
            {/* <AccountCircleIcon
              sx={{ display: isAuthenticated ? "none" : "bloock" }}
            /> */}
          </Link>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              display: isAuthenticated ? "block" : "none",
            }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={() => setOpen(true)}
          />
          <Box variant="span">
            {username && (
              <Typography
                sx={{ display: { xs: "block", sm: "none" } }}
                onClick={() => setOpen(true)}
              >
                {username.name}
              </Typography>
            )}
          </Box>
        </Icon>
      </StyledToolbar>
      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Sign-up</MenuItem>
        <MenuItem>Sign-in</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu> */}
    </AppBar>
  );
};

export default NavBar;
