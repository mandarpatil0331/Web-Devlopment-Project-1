import React from "react";
import { Box, IconButton, Badge, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";


const NavbarLeftOptions = (props) => {
    const SigninOptions = (
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={props.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Button  sx={{color:"whitesmoke",ml:5}} onClick={props.handleLogoutInsructor}>
        Logout
        </Button>
      </Box>
    );
    const MobileOptions = (
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          onClick={props.handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
    );
  
  return (
    <>
      <Box sx={{ flexGrow: 1, mr: 4 }} display="flex" justifyContent="flex-end">
      </Box>

      { SigninOptions}
      {MobileOptions}
    </>
  )
}

export default NavbarLeftOptions