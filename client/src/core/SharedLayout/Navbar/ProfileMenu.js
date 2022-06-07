import React, { useContext } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const ProfileMenu = (props) => {
  const { User } = useContext(AuthContext);
  const isMenuOpen = Boolean(props.anchorEl);
  return (User && 
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={props.handleMenuClose}
    >
      <Link to={`/Student/${User._id}/Profile`}>
        <MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={props.handleAfterLogout}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
