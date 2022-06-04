import React from 'react'
import {Box,Menu,MenuItem} from '@mui/material'

const CategoriesMenu = (props) => {
    const isCatMenuOpen = Boolean(props.anchorElCat);
  return (
    <Box width="100">
    <Menu
      anchorEl={props.anchorElCat}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isCatMenuOpen}
      onClose={props.handleCategoriesClose}
    >
      <MenuItem onClick={props.handleCategoriesClose}>IT- Software</MenuItem>
      <MenuItem onClick={props.handleCategoriesClose}>Business</MenuItem>
    </Menu>
  </Box>
  )
}

export default CategoriesMenu