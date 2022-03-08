import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InfoIcon from "@material-ui/icons/Info";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  name: {},
});

export default function SwipeableTemporaryDrawer({ children }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const options = [
    {
      name: "All Products",
      link: "/products",
      icon: <PresentToAllIcon />,
    },
    {
      name: "My Orders",
      link: "/orders",
      icon: <AddShoppingCartIcon />,
    },
    {
      name: "My Cart",
      link: "/cart",
      icon: <AddShoppingCartIcon />,
    },
    {
      name: "My Profile",
      link: "/account",
      icon: <AccountCircleIcon />,
    },
    {
      name: "About Us",
      link: "/about",
      icon: <InfoIcon />,
    },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <ContactMailIcon />,
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem className={classes.name}>
          {!isAuthenticated ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/login")}
              style={{ margin: "10px" }}
            >
              Sign In
            </Button>
          ) : (
            <Typography>
              Welcome, <span style={{ color: "#f50057" }}>{user.name}</span>
            </Typography>
          )}
        </ListItem>
      </List>
      <Divider />
      <List>
        {options.map((opt) => (
          <ListItem
            button
            component="a"
            onClick={() => history.push(opt.link)}
            target="_blank"
            key={opt.name}
          >
            <ListItemIcon>{opt.icon}</ListItemIcon>
            <ListItemText primary={opt.name} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                dispatch(logout());
                alert.success("Logout Successfully");
              }}
            >
              Logout
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>{children}</Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
