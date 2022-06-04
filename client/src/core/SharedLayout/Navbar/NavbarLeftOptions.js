import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton, Badge, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AuthContext from "../../../context/AuthContext";

const NavbarLeftOptions = (props) => {
  const { User, isInstructor } = useContext(AuthContext);
  const SignoutOptions = (
    <Box sx={{ display: { md: "flex", xs: "none" } }}>
      <Link
        to="/SignUp"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Button variant="contained" sx={{ border: 2, mr: 2 }}>
          Sign Up
        </Button>
      </Link>
      <Link
        to="/SignIn"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Button variant="contained" sx={{ border: 2, mr: 2 }}>
          LogIn
        </Button>
      </Link>
    </Box>
  );
  const SigninOptions = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={10} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={10} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
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
  const forEducatorTypography = (
    <Link
      to="/Educator"
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        For Educators
      </Typography>
    </Link>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1, mr: 4 }} display="flex" justifyContent="flex-end">
        {User && !isInstructor && forEducatorTypography}
        {!User && forEducatorTypography}
      </Box>

      {User && SigninOptions}
      {MobileOptions}
      {!User && SignoutOptions}
    </>
  );
};

export default NavbarLeftOptions;
