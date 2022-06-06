import React, { useContext, useEffect} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import MenuDrawer from "./MenuDrawer";
import ProfileMenu from "./ProfileMenu";
import CategoriesMenu from "./CategoriesMenu";
import MobileMenuOption from "./MobileMenuOption";
import NavbarLeftOptions from "./NavbarLeftOptions";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const contextVal = useContext(AuthContext);
  useEffect(() => {
    console.log(contextVal);
  }, [contextVal]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElCat, setAnchorElCat] = React.useState(null);

  const handleAfterLogout = () => {
    contextVal.UserSignOut();
    handleMenuClose();
    localStorage.removeItem("token");
    if(contextVal.isInstructor){
      contextVal.ChangeisEducator(false);
    }
    navigate("/");
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

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleCategoriesClose = () => {
    setAnchorElCat(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <MenuDrawer
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
            />
            <Link
              to="/"
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
            <Button
              sx={{ textTransform: "none" }}
              onClick={handleOpenCategoriesMenu}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  mx: 2,
                  color: "whitesmoke",
                }}
              >
                Categories
              </Typography>
            </Button>
            <SearchBar />
            <NavbarLeftOptions
              handleMobileMenuOpen={handleMobileMenuOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
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
        handleAfterLogout={handleAfterLogout}
      />
      <CategoriesMenu
        anchorElCat={anchorElCat}
        handleCategoriesClose={handleCategoriesClose}
      />
    </>
  );
}
