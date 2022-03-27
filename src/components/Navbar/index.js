import React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../../helpers/logo.png";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Home from "@mui/icons-material/Home";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
  large: {
    paddingTop: "3px",
    paddingBottom: "2px",
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: theme.palette.text.disabled,
  },
  linkTextActive: {
    textDecoration: `none`,
    color: theme.palette.text.primary,
  },
  appBar: {
    paddingRight: "79px",
    paddingLeft: "118px",
    paddingBottom: "1px",
    borderBottom: "solid 1px transparent !important",
    boxShadow:
      "0 3px 6px -2px rgba(0, 0, 0, 0.12),0 6px 16px -11px rgba(0, 0, 0, 0.08)",
    top: 0,
    marginBottom: "20px",
    zIndex: 99990,
    "@media (max-width: 900px)": {
      paddingLeft: 0,
      paddingRight: "10px",
    },
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  navItems: {
    marginLeft: "4px",
  },
  icons: {
    marginRight: "4px",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const firebase = useFirebase();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar} color="default">
        <Toolbar>
          <Avatar
            variant="square"
            src={Logo}
            className={classes.large}
            sx={{ width: 60, height: 60 }}
          />
          <Typography variant="h6" className={classes.title}>
            Niwder.io{" "}
            <Chip
              size="small"
              label="Beta"
              variant="outlined"
              color="secondary"
            />
          </Typography>
          <List
            component={"nav"}
            aria-labelledby={"main navigation"}
            className={classes.navDisplayFlex}
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? classes.linkTextActive : classes.linkText
              }
            >
              <ListItem button>
                <Home />{" "}
                <ListItemText className={classes.navItems} primary={"Home"} />
              </ListItem>{" "}
            </NavLink>
            {isLoaded(auth) && !isEmpty(auth) && (
              <NavLink
                to={"/transfers"}
                className={({ isActive }) =>
                  isActive ? classes.linkTextActive : classes.linkText
                }
              >
                <ListItem button>
                  <BrowserUpdatedIcon />{" "}
                  <ListItemText
                    className={classes.navItems}
                    primary={"Transfers"}
                  />
                </ListItem>{" "}
              </NavLink>
            )}
            {isLoaded(auth) && !isEmpty(auth) ? (
              <div>
                <ListItem
                  button
                  sx={{ color: "text.disabled" }}
                  onClick={() => signOut()(firebase)}
                >
                  <LogoutIcon />
                  <ListItemText
                    className={classes.navItems}
                    primary={"Sign Out"}
                  />
                </ListItem>
              </div>
            ) : (
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? classes.linkTextActive : classes.linkText
                }
              >
                <ListItem button>
                  <LoginIcon />
                  <ListItemText
                    className={classes.navItems}
                    primary={"Sign In"}
                  />
                </ListItem>
              </NavLink>
            )}
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
