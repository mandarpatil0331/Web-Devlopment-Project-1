import React from "react";
import { Menu, MenuItem, IconButton, Badge } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const MobileMenuOption = (props) => {
  const isMobileMenuOpen = Boolean(props.mobileMoreAnchorEl);

  const SigninOptions = (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={props.handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const SignoutOptions = (
    <Menu
    anchorEl={props.mobileMoreAnchorEl}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMobileMenuOpen}
    onClose={props.handleMobileMenuClose}
  >
      <MenuItem>
      <IconButton
          size="large"
          color="inherit"
        >
            <PersonAddIcon/>
        </IconButton>
        <p>Sign Up</p>
      </MenuItem>
      <MenuItem>
      <IconButton
          size="large"
          color="inherit"
        >
            <LoginIcon/>
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {props.user && SigninOptions}
      {!props.user && SignoutOptions}
      </>
  );
};

export default MobileMenuOption;
