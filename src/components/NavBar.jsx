import { AppBar } from "@mui/material";
import { styled, Toolbar, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Beenhere } from "@mui/icons-material";
import { InputBase, Badge, Avatar, Menu, MenuItem } from "@mui/material";
import { Mail, Notifications } from "@mui/icons-material";

import React from "react";
import { useState } from "react";

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
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
          <Box variant="span">
            <Typography
              sx={{ display: { xs: "block", sm: "none" } }}
              onClick={(e) => setOpen(true)}
            >
              H C Teo
            </Typography>
          </Box>
        </Icon>
      </StyledToolbar>
      <Menu
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
