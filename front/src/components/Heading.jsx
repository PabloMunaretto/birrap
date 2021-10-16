import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import heading2Styles from "../Styles/heading2"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/user";
import { useHistory } from "react-router-dom";
import { getProductName, getProducts } from "../store/products";
import { Grid } from "@material-ui/core";
import { getCarrito } from "../store/carrito";



export default function PrimarySearchAppBar() {
  const classes = heading2Styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const carrito = useSelector((state) => state.carrito);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const user = useSelector((state) => state.user);

  // SEARCH logica
  // const products = useSelector(state => state.products)
  const [name, setName] = React.useState("");
  const handleChange = (e) => {
    setName(e.target.value);
    const mayuscula = name.toUpperCase();
    if (mayuscula.length > 1) dispatch(getProductName(mayuscula));
    else dispatch(getProducts());
  };

  useEffect(() => {
    if (user) dispatch(getCarrito(user.id));
  }, [items, user, dispatch]);

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = (e) => {
    localStorage.clear();
    dispatch(logOutUser())
      .then(() => {
        handleMenuClose();
        history.push("/");
      })
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user && user.id && (
        <>
          <div>
              <Typography variant="h6" align="center">  Hola {user.firstName}</Typography>
          </div>
          <div className={classes.sectionMobile}>
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={carrito.items && carrito.items.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/carrito"
              >
                <p>Carrito</p>
              </Link>
            </MenuItem>
          </div>
        </>
      )}
      {user && user.id ? (
        <div>
          <MenuItem onClick={handleLogOut}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
            <p>Log out</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/login"}
          >
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Log in</p>
            </MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/register"}
          >
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Register</p>
            </MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ height: "10%" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Grid
              variant="contained"
              color="primary"
              onClick={() => dispatch(getProducts())}
            >
              <Typography className={classes.title} variant="h6" noWrap>
                <FastfoodIcon />
                BIRRAPP
              </Typography>
            </Grid>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => handleChange(e)}
              value={name}
              type="text"
              name="movies"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />

          {/* Por ahora este ninguna funcion ------ */}
          {user && user.id && (
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/me">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
          )}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

          {/*  PARTE DESKTOP                                ------------------------------- */}

          {user && user.id ? (
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <p>Hola, </p>
              </IconButton>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/carrito"
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <p>Mi carrito</p>
                </IconButton>
              </Link>

              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogOut}
              >
                {/* <AccountCircle /> */}
                <p>Log out</p>
              </IconButton>
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <p>Log in</p>
                </IconButton>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/register"}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <p>Register</p>
                </IconButton>
              </Link>
            </div>
          )}
          {/* ------------------------------------ */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
