import React from 'react'
import { Menu,MenuItem } from '@mui/material'

const ProfileMenu = (props) => {
const isMenuOpen = Boolean(props.anchorEl);
  return (
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
      <MenuItem onClick={props.handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={props.handleLogoutInsructor}>Logout</MenuItem>
    </Menu>
  )
}

export default ProfileMenu