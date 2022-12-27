import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../Header/headerImg.png";
import Sidedrawer from "../Sidedrawer";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomizedMenus from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 50,
    marginRight: "10px",
    cursor:"pointer"
  },
  button: {
    margin: theme.spacing(1),
  },
  customizeToolbar: {
    minHeight: 75
  },
  [theme.breakpoints.down("md")]:{
    root:{
      flexGrow:1
    },
  }

}));

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const cart=useSelector((state)=>state.cart.cartItems)
  let cartLength=cart.length;
  return (
    <div className="classes.root">
      <AppBar color="secondary">
        <Toolbar className={classes.customizeToolbar}>
          <Sidedrawer>
              <MenuIcon
                style={{ color: "#fff", backgroundColor: "transparent" }}
              />
          </Sidedrawer>
            <img
              onClick={() => history.push("/")}
              src={logo}
              alt=""
              className={classes.logo}
            />
          {!mobile ? (
            <Typography variant="h6" className={classes.title}>
              Urban Kart
            </Typography>
          ) : (
            ""
          )}
          <IconButton className={classes.button} onClick={() => history.push("/search")}>
            <SearchIcon style={{ color: "#fff" }} />
          </IconButton>

          {isAuthenticated ? (
            <CustomizedMenus />
          ) : (
            <Button
              color="inherit"
              onClick={() => history.push("/login")}
              variant="outlined"
              className={classes.button}
              disableElevation
            >
              Login
            </Button>
          )}
          <IconButton className={classes.cart} onClick={()=>history.push("/cart")} aria-label="cart">
            <Badge  badgeContent={cartLength} color="secondary">
              <ShoppingCartOutlinedIcon style={{color:'#f8f8f8'}} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
