import React,{useContext} from 'react'
import {AppBar,Container,Toolbar,Typography} from '@mui/material'
import {Link,useNavigate} from 'react-router-dom'
import NavbarLeftOptions from "../InstructorNavbar/NavbarLeftOptions"
import MobileMenuOption from "../InstructorNavbar/MobileMenuOption"
import ProfileMenu from './ProfileMenu'
import AuthContext from '../../../context/AuthContext'


const InstructorNavbar = () => {
    const contextVal = useContext(AuthContext);
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const [anchorElNav, setAnchorElNav] = React.useState(false);
const [anchorElCat, setAnchorElCat] = React.useState(null);
const navigate = useNavigate();
const handleLogoutInsructor = () => {
    contextVal.UserSignOut();
    handleMenuClose();
    if(contextVal.isInstructor){
      contextVal.ChangeisEducator(false);
    }
    navigate("/Educator/SignIn");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleOpenCategoriesMenu = (event) => {
    setAnchorElCat(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
      <>
    <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
        
            <Link
              to="/Instructor"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, mx: 2 }}
              >
                ClassRoom
              </Typography>
            </Link>

            <NavbarLeftOptions
              handleMobileMenuOpen={handleMobileMenuOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
              handleLogoutInsructor={handleLogoutInsructor}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <MobileMenuOption
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
     <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleLogoutInsructor={handleLogoutInsructor}
      />
    </>
  )
}

export default InstructorNavbar